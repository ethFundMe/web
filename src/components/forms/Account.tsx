'use client';

import { REGEX_CODES } from '@/lib/constants';
import { updateUser } from '@/lib/queries';
import { efmUserAddressStore, userStore } from '@/store';
import { User } from '@/types';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button, Input } from '../inputs';

const efm_endpoint = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT;

type TAccount = {
  username: string;
  fullName: string;
  email: string;
};

export const AccountForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = userStore();
  const { address } = efmUserAddressStore();
  const router = useRouter();
  const token = getCookie('efmToken') || '';

  const { handleSubmit, register, formState } = useForm<TAccount>({
    defaultValues: {
      fullName: '',
      email: '',
      username: '',
    },
  });

  const { isDirty } = formState;
  const onSubmit: SubmitHandler<TAccount> = async (data) => {
    if (!address) {
      toast.error('Wallet not connected');
      router.refresh();
      return;
    }
    const { email, fullName, username } = data;
    const new_user = {
      email,
      eth_address: address as `0x${string}`,
      full_name: fullName,
      username,
    };
    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/user/${address}`
      );
      // const emailCheckRes = await fetch(`${efm_endpoint}/check/email/${new_user.email}`);
      // if (!emailCheckRes.ok) {
      //   const emailErr = await emailCheckRes.json();
      //   toast.error('email already exists');
      //   throw new Error(emailErr?.message || 'Email availability check failed');
      // }

      // const usernameCheckRes = await fetch(`${efm_endpoint}/check/username/${new_user.username}`);
      // if (!usernameCheckRes.ok) {
      //   const usernameErr = await usernameCheckRes.json();
      //   toast.error('username already exists');
      //   throw new Error(usernameErr?.message || 'Username availability check failed');
      // }

      if (res.ok) {
        const user: User = await res.json();

        if (user && !user.registered) {
          const res = await updateUser({
            ethAddress: new_user.eth_address,
            email,
            username,
            fullName,
            token,
          });

          if (!res) throw new Error();

          setUser(res);
          toast.success('Account updated');
          router.push('/');
        }
      } else {
        //       const usernameCheckRes = await fetch(`${efm_endpoint}/check/username/${new_user.username}`);
        // if (!usernameCheckRes.ok) {
        //   const usernameErr = await usernameCheckRes.json();
        //   toast.error('username already exists');
        //   throw new Error(usernameErr?.message || 'Username availability check failed');
        // }
        //       const emailCheckRes = await fetch(`${efm_endpoint}/check/email/${new_user.email}`);
        //       if (!emailCheckRes.ok) {
        //         const emailErr = await emailCheckRes.json();
        //         toast.error('email already exists');
        //         throw new Error(emailErr?.message || 'Email availability check failed');
        //       }

        const create_user_res = await fetch(`${efm_endpoint}/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(new_user),
        });

        if (!create_user_res.ok) {
          const err = await create_user_res.json();
          throw err;
        }
        const create_user = (await create_user_res.json()) as {
          message: string;
          user: User;
        };
        console.log(create_user_res);
        const user = create_user.user;
        console.log(user);
        if (user.ethAddress) {
          setUser(user);
          console.log(user);
          toast.success('Account created. Please Connect Wallet again');
          router.push('/');
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('We could not create your account');
      toast.error((error as { error: string }).error);
      router.refresh();
    }
  };

  const onError: SubmitErrorHandler<TAccount> = (errors) => {
    console.error(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className='mx-auto my-6 max-w-lg space-y-3 px-4'
    >
      <fieldset>
        <Input
          id='email'
          type='email'
          label='Email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: REGEX_CODES.email,
              message: 'Invalid email address',
            },
          })}
          required
          placeholder='Enter your email'
        />
      </fieldset>
      <fieldset>
        <Input
          id='full name'
          type='text'
          label='Full Name'
          {...register('fullName', { required: 'Name is required', min: 1 })}
          placeholder='Enter your full name'
        />
      </fieldset>
      <fieldset>
        <Input
          id='username'
          type='text'
          label='Username'
          {...register('username', {
            required: 'Username is required',
            pattern: {
              value: REGEX_CODES.username,
              message:
                'Username can only contain letters, numbers, and underscores.',
            },
            minLength: 2,
            maxLength: 16,
          })}
          required
          placeholder='Enter your username'
        />
      </fieldset>
      <Button type='submit' disabled={isLoading || !isDirty} className='w-full'>
        {isLoading ? 'Loading...' : 'Create account'}
      </Button>
    </form>
  );
};
