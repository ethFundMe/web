'use client';

import { updateUser } from '@/actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { REGEX_CODES } from '@/lib/constants';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { Button } from './inputs';
import { Textarea } from './ui/textarea';

type FormStatus =
  | 'Uploading profile picture'
  | 'Uploading banner'
  | 'Saving changes';

export default function UpdateProfileForm({ user }: { user: User }) {
  const formSchema = z.object({
    fullName: z
      .string({ required_error: 'Fullname is required' })
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
      .number({ required_error: 'Enter amount in ETH' })
      .min(0, { message: 'Enter a fee of 0 or greater' })
      .max(user.isVerified ? 100000 : 2, {
        message: user.isVerified
          ? 'Enter an amount less than 1000000 ETH'
          : 'Verify your creator account to exceed 2ETH limit',
      })
      .optional(),
  });

  const [formStatus, setFormStatus] = useState<FormStatus | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName ?? '',
      creatorFee: user.creatorFee ?? 0,
      bio: user.bio ?? '',
      email: user.email ?? '',
    },
    mode: 'onChange',
  });

  const editMade =
    form.watch('fullName').trim() !== user.fullName ||
    form.watch('creatorFee') !== user.creatorFee ||
    form.watch('email') !== user.email ||
    !!form.watch('bio')?.trim() !== !!user.bio ||
    form.watch('bio')?.trim() !== user.bio;

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log({ values });
    setFormStatus('Saving changes');
    updateUser({
      bio: values.bio,
      // creatorFee: values.creatorFee,
      email: values.email,
      ethAddress: user.ethAddress,
      fullName: values.fullName,
    })
      .then((data) => {
        setFormStatus(null);
        form.reset();
        toast.success('Profile updated successfully');
        router.push(`/dashboard/${data.ethAddress}`);
      })
      .catch(() => {
        setFormStatus(null);
        toast.error('Failed to update profile');
      });
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
                <FormLabel>Fullname</FormLabel>
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
                <FormLabel>Creator Fees</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Enter your creator fee'
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
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
          disabled={!!formStatus || !editMade}
          className='block w-full disabled:cursor-not-allowed disabled:bg-opacity-50 md:w-52'
        >
          {formStatus ?? 'Save'}
        </Button>
      </form>
    </Form>
  );
}
