'use client';

import { userStore } from '@/store';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { Button, Input } from '../inputs';

const efm_endpoint = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT;

type TAccount = {
  fullName: string;
  email: string;
};

export const AccountForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = userStore();
  const { address, connector, chainId } = useAccount();
  const router = useRouter();

  const { handleSubmit, register } = useForm<TAccount>({
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<TAccount> = async (data) => {
    if (!address || !connector || !chainId) {
      toast.error('Wallet not connected.');
      router.refresh();
      return;
    }
    const { email, fullName } = data;
    const new_user = {
      email,
      eth_address: address,
      full_name: fullName,
    };
    try {
      setIsLoading(true);
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
      const user = create_user.user;
      if (user.ethAddress) {
        setUser(user);
        router.push('/');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('We could not create your account.');
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
          id='full name'
          type='text'
          label='Full Name'
          {...register('fullName', { required: 'Name is required', min: 1 })}
          placeholder='Enter your full name'
        />
      </fieldset>
      <fieldset>
        <Input
          id='email'
          type='email'
          label='Email'
          {...register('email', { required: 'Email is required' })}
          required
          placeholder='Enter your email'
        />
      </fieldset>
      <Button type='submit' disabled={isLoading} className='w-full'>
        {isLoading ? 'Loading...' : 'Create account'}
      </Button>
    </form>
  );
};
