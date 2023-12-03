'use client';

import { useCreateCampaign } from '@/lib/hook';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDebounce } from 'usehooks-ts';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';
import { Button } from '../Button';
import { InputGroup } from '../formElements/InputGroup';
import { SelectInputGroup } from '../formElements/SelectInputGroup';
import { TextAreaInputGroup } from '../formElements/TextArea';
import { CampaignFormFields } from './types';

export default function CreateCampaignForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { address } = useAccount();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<CampaignFormFields>({
    defaultValues: {
      campaignType: 'personal',
      description: '',
      fees: 0,
      goal: 0,
      title: '',
      links: [''],
      beneficiary: address,
    },
  });

  const beneficiary = useDebounce(
    useWatch({ control, name: 'beneficiary', defaultValue: address }),
    500
  );
  const description = useDebounce(
    useWatch({ control, name: 'description', defaultValue: '' }),
    500
  );
  const goal = useDebounce(
    useWatch({ control, name: 'goal', defaultValue: 0 }),
    500
  );
  const title = useDebounce(
    useWatch({ control, name: 'title', defaultValue: '' }),
    500
  );
  // const links = useDebounce(
  //   useWatch({ control, name: 'links', defaultValue: [''] }),
  //   500
  // );

  const {
    isLoadingCreateCampaign,
    isLoadingCreateCampaignTxn,
    isCreateCampaignTxnSuccess,
    writeCreateCampaign,
  } = useCreateCampaign({
    beneficiary,
    description,
    goal,
    links: ['http://link1.example'],
    title,
  });

  const getCampaignType = () => {
    const _ = searchParams.get('campaign-type');
    return _ === 'personal' || _ === 'others' ? _ : '';
  };
  const campaignType = getCampaignType();

  const onSubmit: SubmitHandler<CampaignFormFields> = (data) => {
    const { beneficiary, goal } = data;
    if (!isAddress(beneficiary)) {
      return toast.error('Address not valid');
    }

    if (goal <= 0) {
      return toast.error('Enter a valid ETH amount');
    }

    // if (!links.every((str) => str.trim() !== '')) {
    //   return toast.error('Please provide a link.');
    // }

    return writeCreateCampaign?.();
  };

  const onError: SubmitErrorHandler<CampaignFormFields> = (errors) => {
    console.error(errors);
  };

  useEffect(() => {
    if (isCreateCampaignTxnSuccess) {
      toast.success('Campaign created.');
      reset();
      // router.push('/campaigns');
      return;
    }
  }, [isCreateCampaignTxnSuccess, reset, router]);

  return (
    <form
      className='mx-auto mt-5 grid max-w-lg grid-cols-2 gap-5 rounded-md border border-neutral-300 p-3 sm:gap-8 sm:p-5'
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className='col-span-2 space-y-2'>
        <InputGroup
          id='title'
          label='Campaign title'
          {...register('title', { required: 'Title is required' })}
          placeholder='Enter your campaign title'
        />

        {errors.title && (
          <p className='text-sm text-red-500'>{errors.title.message}</p>
        )}
      </div>

      <div className='col-span-1 space-y-2'>
        <SelectInputGroup
          id='campaignType'
          label='Campaign type'
          defaultValue={campaignType}
          {...register('campaignType', { required: 'Choose campaign type' })}
        >
          <option disabled>-- Select campaign type --</option>
          <option value='personal'>Personal</option>
          <option value='others'>Others</option>
        </SelectInputGroup>
      </div>

      <div className='col-span-1 space-y-2'>
        <InputGroup
          id='goal'
          type='number'
          label='Goal (ETH)'
          step={0.0001}
          min={0.0001}
          placeholder='Enter your goal (ETH)'
          {...register('goal', {
            required: 'Goal is required',
            min: {
              value: 0.0001,
              message: 'Amount cannot be less than 0.0001 ETH',
            },
            max: {
              value: 1000000,
              message: 'Enter an amount less than 1000000 ETH',
            },
          })}
          error={errors.goal?.message}
        />
      </div>

      {watch('campaignType') === 'others' && (
        <div className='col-span-2 space-y-2'>
          <InputGroup
            id='fees'
            type='number'
            label='Campaign creator fee (ETH)'
            step={0.0001}
            min={0.0001}
            placeholder='Your creator fee (ETH)'
            {...register('fees', {
              required: 'Creator fee is required',
              min: {
                value: 0.0001,
                message: 'Amount cannot be less than 0.0001 ETH',
              },
              max: {
                value: 1000000,
                message: 'Enter an amount less than 1000000 ETH',
              },
            })}
            error={errors.goal?.message}
          />
        </div>
      )}

      <div className='col-span-2 space-y-2'>
        <TextAreaInputGroup
          label='Campaign description'
          id='description'
          placeholder='Enter a description for your campaign'
          {...register('description', { required: 'Description is required' })}
          rows={5}
          error={errors.description?.message}
        />
      </div>

      <Button
        type='submit'
        disabled={isLoadingCreateCampaign || isLoadingCreateCampaignTxn}
        size='md'
        className='col-span-2'
        wide
      >
        {isLoadingCreateCampaign || isLoadingCreateCampaignTxn
          ? 'Loading...'
          : 'Create'}
      </Button>
    </form>
  );
}
