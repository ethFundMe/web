'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { userStore } from '@/store';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { parseEther } from 'viem';
import {
  BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { z } from 'zod';

export const UpdateCreatorFeeForm = ({ user }: { user: User }) => {
  const { setUser } = userStore();
  const router = useRouter();

  const {
    data: hash,
    error: writingError,
    isError,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log(`Settled update CreatorFee, ${{ data, error }}`);
      },
    },
  });

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

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

  const schema = z.object({
    creatorFee: z
      .number({ required_error: 'Enter amount in percentage' })
      .min(0, { message: 'Enter a minimum value of 0 or greater' })
      .max(30, {
        message: 'Enter a maximum value of 30% or less',
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { creatorFee: Number(user?.creatorFee) || 0 },
  });

  const [formStatus, setFormStatus] = useState<'Saving...' | null>(null);

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
    setFormStatus('Saving...');
    handleWriteContract(data.creatorFee as number);
  };

  const watchedAmount: number = form.watch('creatorFee') as number;
  const creatorFeeEditMade =
    form.watch('creatorFee') !== Number(user?.creatorFee);

  useEffect(() => {
    if (isConfirmedTxn) {
      if (user) {
        setUser({ ...user, creatorFee: form.getValues('creatorFee') || 0 });
      }
      toast.success('Profile updated');
      setFormStatus(null);
      router.refresh();
      router.push(`/dashboard/${user?.ethAddress}`);
    } else if (isError && writingError) {
      let errorMsg =
        (writingError as BaseError).shortMessage || writingError.message;

      if (errorMsg === 'User rejected the request.') {
        errorMsg = 'Request rejected';
      } else {
        errorMsg = 'Failed to update creator fee';
      }
      toast.error(errorMsg);
      setFormStatus(null);
    }
  }, [isConfirmedTxn, user, router, isError, form, setUser, writingError]);

  return (
    <Form {...form}>
      <form
        className='flex w-full max-w-xs flex-col gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='creatorFee'
          render={({ field }) => (
            <FormItem className='w-full'>
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

        <Button
          disabled={!!formStatus || !creatorFeeEditMade || isConfirmingTxn}
          className='mt-4 w-full max-w-xs disabled:pointer-events-auto'
        >
          {formStatus || 'Save'}
        </Button>
      </form>
    </Form>
  );
};
