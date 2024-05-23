'use client';

import { updateUser } from '@/actions';
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
  fullName: string;
  email: string;
};

export const AccountForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = userStore();
  const { address } = efmUserAddressStore();
  const router = useRouter();
  const token = getCookie('efmToken') || '';

  const { handleSubmit, register } = useForm<TAccount>({
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<TAccount> = async (data) => {
    if (!address) {
      toast.error('Wallet not connected');
      router.refresh();
      return;
    }
    const { email, fullName } = data;
    const new_user = {
      email,
      eth_address: address as `0x${string}`,
      full_name: fullName,
    };
    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT}/api/user/${address}`
      );

      if (res.ok) {
        const user: User = await res.json();

        if (user && !user.registered) {
          const res = await updateUser({
            ethAddress: new_user.eth_address,
            email,
            fullName,
            token,
          });

          if (!res) throw new Error();

          setUser(res);
          toast.success('Account updated');
          router.push('/');
        }
      } else {
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
          toast.success('Account created');
          router.push('/');
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('We could not create your account');
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
