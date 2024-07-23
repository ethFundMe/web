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
import { REGEX_CODES } from '@/lib/constants';
import { updateUser } from '@/lib/queries';
import { userStore } from '@/store';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie } from 'cookies-next';
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

const efm_endpoint = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT;

export default function UpdateProfileForm({ user }: { user: User }) {
  const formSchema = z.object({
    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(2)
      .max(250),
    username: z
      .string({ required_error: 'Username is required' })
      .regex(REGEX_CODES.username, {
        message: 'Username can only contain letters, numbers, and underscores.',
      })
      .min(2)
      .max(16),
    email: z
      .string()
      .regex(REGEX_CODES.email, { message: 'Enter a valid email' }),
    bio: z
      .string()
      .max(450, { message: 'Bio is limited to 450 characters' })
      .optional(),
  });

  const { setUser } = userStore();
  const token = getCookie('efmToken');

  const [formStatus, setFormStatus] = useState<FormStatus | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName ?? '',
      bio: user.bio ?? '',
      username: user.username ?? '',
      email: user.email ?? '',
    },
    mode: 'onChange',
  });

  const {
    formState: { dirtyFields, isDirty },
  } = form;
  // const { isDirty } = formState;

  const router = useRouter();

  async function updateUserProfile(values: z.infer<typeof formSchema>) {
    setFormStatus('Saving changes');

    if (dirtyFields.username) {
      // check if username already exists
      // if yes, display error message
      // if no, proceed with updating the username
      const usernameCheckRes = await fetch(
        `${efm_endpoint}/api/check/username/${values.username}`
      );

      if (!usernameCheckRes.ok) {
        setFormStatus(null);
        form.reset();
        return toast.error('username already exists');
      }
    }
    if (isDirty) {
      updateUser({
        bio: values.bio,
        email: values.email,
        ethAddress: user.ethAddress,
        username: values.username,
        fullName: values.fullName,
        token: token || '',
      })
        .then((data) => {
          // Reset form and navigate to the dashboard
          setFormStatus(null);
          setUser(data);
          form.reset();
          toast.success('Profile updated');
          router.push(`/dashboard/${data.ethAddress}`);
        })
        .catch((error) => {
          console.log(`Failed to update profile, ${error}`);
          setFormStatus(null);
          toast.error('Failed to update profile');
        });
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUserProfile(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto w-full space-y-4 rounded-md border border-neutral-300 p-3 sm:max-w-xl sm:p-5 md:py-4'
      >
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
          name='username'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Enter your username' {...field} />
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
                  disabled={!!user?.email}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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
          disabled={!!formStatus || !isDirty}
          className='block w-full disabled:cursor-not-allowed disabled:bg-opacity-50'
        >
          {formStatus ?? 'Save'}
        </Button>
      </form>
    </Form>
  );
}
