/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { REGEX_CODES } from '@/lib/constants';
import { updateUser } from '@/lib/queries';
import { userStore } from '@/store';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BaseError, parseEther } from 'viem';
import {
  // BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import * as z from 'zod';
import { Button } from './inputs';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';

type FormStatus =
  | 'Uploading profile picture'
  | 'Uploading banner'
  | 'Saving changes';

export default function UpdateProfileForm({ user }: { user: User }) {
  const formSchema = z.object({
    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(2)
      .max(250),
    email: z
      .string()
      .regex(REGEX_CODES.email, { message: 'Enter a valid email' }),
    bio: z
      .string()
      .max(450, { message: 'Bio is limited to 450 characters' })
      .optional(),
    // ethAddress: z.string().regex(REGEX_CODES.walletAddress).optional(),
    creatorFee: z
      .number({ required_error: 'Enter amount in percentage' })
      .min(0, { message: 'Enter a minimum value of 0 or greater' })
      .max(30, {
        message: 'Enter a maximum value of 30% or less',
      })
      .optional(),
  });
  const {
    data: hash,
    error: writingError,
    isError,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log(`Settled update CreatorFee, ${{ data, error }}`);
      },
    },
  });

  const { setUser } = userStore();
  const token = getCookie('efmToken');

  const {
    isLoading: isConfirmingTxn,
    isPending: isPendingTxn,
    isSuccess: isConfirmedTxn,
  } = useWaitForTransactionReceipt({ hash });

  const handleWriteContract = (creatorFeePercent: number) => {
    const creatorFee = parseEther(creatorFeePercent.toString());
    return writeContract({
      abi: EthFundMe,
      address: ethFundMeContractAddress,
      functionName: 'setCreatorFeePercentage',
      chainId: ethChainId,
      args: [creatorFee],
    });
  };
  const [formStatus, setFormStatus] = useState<FormStatus | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName ?? '',
      creatorFee: Number(user.creatorFee) ?? 0,
      bio: user.bio ?? '',
      email: user.email ?? '',
    },
    mode: 'onChange',
  });

  const watchedAmount: number = form.watch('creatorFee') as number;
  const creatorFeeEditMade =
    form.watch('creatorFee') !== Number(user.creatorFee);

  const editMade =
    form.watch('creatorFee') !== Number(user.creatorFee) ||
    form.watch('fullName').trim() !== user.fullName ||
    form.watch('email') !== user.email ||
    !!form.watch('bio')?.trim() !== !!user.bio ||
    form.watch('bio')?.trim() !== user.bio;

  const router = useRouter();

  function updateUserProfile(values: z.infer<typeof formSchema>) {
    if (creatorFeeEditMade && !editMade) {
      handleWriteContract(values.creatorFee as number);
    }
    if (editMade && creatorFeeEditMade) {
      updateUser({
        bio: values.bio,
        email: values.email,
        ethAddress: user.ethAddress,
        fullName: values.fullName,
        token: token || '',
      })
        .then((data) => {
          handleWriteContract(values.creatorFee as number);
          // Reset form and navigate to the dashboard
          setFormStatus(null);
          setUser(data);
          form.reset();
        })
        .catch((error) => {
          console.log(`Failed to update profile, ${error}`);
          setFormStatus(null);
          toast.error('Failed to update profile');
        });
    }
    if (!creatorFeeEditMade && editMade) {
      updateUser({
        bio: values.bio,
        email: values.email,
        ethAddress: user.ethAddress,
        fullName: values.fullName,
        token: token || '',
      })
        .then((data) => {
          // Reset form and navigate to the dashboard
          setFormStatus(null);
          setUser(data);
          form.reset();
          toast.success('Profile updated');
          if (!creatorFeeEditMade) {
            router.push(`/dashboard/${data.ethAddress}`);
          }
        })
        .catch((error) => {
          console.log(`Failed to update profile, ${error}`);
          setFormStatus(null);
          toast.error('Failed to update profile');
        });
    }
  }
  useEffect(() => {
    if (isConfirmedTxn) {
      toast.success('Profile updated');
      router.refresh();
      router.push(`/dashboard/${user.ethAddress}`);
    } else if (isError && writingError) {
      let errorMsg =
        (writingError as BaseError).shortMessage || writingError.message;

      if (errorMsg === 'User rejected the request.') {
        errorMsg = 'Request rejected';
      } else {
        errorMsg = 'Failed to update creator fee';
      }
      toast.error(errorMsg);
    }
  }, [isConfirmedTxn, user, router, isError, writingError]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUserProfile(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto w-full space-y-4 rounded-md border border-neutral-300 p-3 sm:max-w-2xl sm:p-5 md:py-4'
      >
        <div className='grid w-full grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your fullName' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='creatorFee'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creator fee (%)</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-3'>
                    <div className='mr-2 flex w-14 flex-shrink-0 items-center gap-1 text-sm'>
                      <Input
                        className='hidden-arrows flex-shrink-0'
                        type='number'
                        disabled={field.disabled}
                        ref={field.ref}
                        max={30}
                        min={0}
                        step={0.1}
                        name={field.name}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                      <span className='block'>%</span>
                    </div>
                    <Slider
                      onValueChange={(e) => {
                        form.setValue('creatorFee', e[0] as number);
                      }}
                      value={[watchedAmount as unknown as number]}
                      min={0}
                      max={30}
                      step={0.1}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Describe yourself and what you do'
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={!!formStatus || !editMade || isConfirmingTxn}
          className='block w-full disabled:cursor-not-allowed disabled:bg-opacity-50 md:w-52'
        >
          {formStatus ?? 'Save'}
        </Button>
      </form>
    </Form>
  );
}
