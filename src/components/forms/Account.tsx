'use client';

import { userStore } from '@/store';
import { ErrorResponse, User } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SiweMessage } from 'siwe';
import { useAccount, useNetwork } from 'wagmi';
import { Button, Input } from '../inputs';

const efm_endpoint = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT;

type TAccount = {
  fullName: string;
  email: string;
};

export const AccountForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = userStore();
  const { address, connector } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();

  const { handleSubmit, register } = useForm<TAccount>({
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<TAccount> = async (data) => {
    if (!address || !connector || !chain?.id) {
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

        const nonce_res = await fetch(
          `${efm_endpoint}/api/nonce/${user.ethAddress}`,
          {
            credentials: 'include',
          }
        );
        if (!nonce_res.ok) {
          const err: { error: ErrorResponse } = await nonce_res.json();
          throw err;
        }
        const nonce = await nonce_res.text();
        const message = new SiweMessage({
          domain: window.location.host,
          address,
          chainId: chain.id,
          statement:
            'Welcome to EthFundMe. I accept the EthFundMe terms of service: https://ethfund.me',
          uri: window.location.origin,
          version: '1',
          nonce,
        }).prepareMessage();

        const walletClient = await connector.getWalletClient();
        const signature = await walletClient.signMessage({
          message,
          account: address,
        });
        if (signature) {
          const verify_res = await fetch(
            `${efm_endpoint}/api/verify/${user.ethAddress}`,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message, signature }),
            }
          );

          if (!verify_res.ok) {
            const err: ErrorResponse = await verify_res.json();
            throw err;
          } else {
            await verify_res.json();
            setIsLoading(false);
            toast.success('Account has been successfully created!');
            router.refresh();
            return;
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      // eslint-disable-next-line quotes
      toast.error("We couldn't create your account.");
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
      <Button type='submit' disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Create'}
      </Button>
    </form>
  );
};
