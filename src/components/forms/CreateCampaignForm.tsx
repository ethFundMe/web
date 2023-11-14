'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '../Button';
import { InputGroup } from '../formElements/InputGroup';
import { SelectInputGroup } from '../formElements/SelectInputGroup';
import { TextAreaInputGroup } from '../formElements/TextArea';
import { CreateCampaignFormFields } from './types';

export default function CreateCampaignForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<CreateCampaignFormFields>();

  const router = useRouter();
  const searchParams = useSearchParams();

  const getCampaignType = () => {
    const _ = searchParams.get('campaign-type');
    return _ === 'personal' || _ === 'others' ? _ : '';
  };
  const campaignType = getCampaignType();

  const onSubmit: SubmitHandler<CreateCampaignFormFields> = (formData) => {
    // save to db
    if (
      window.confirm(`Saved "${formData.title}" to db \nSee all campaigns?`)
    ) {
      toast.success('Campaign successfully created');
      router.push('/campaigns');
    }

    reset();
  };

  return (
    <form
      className='mx-auto mt-5 grid max-w-lg grid-cols-2 gap-5 rounded-md border border-neutral-300 p-3 sm:gap-8 sm:p-5'
      onSubmit={handleSubmit(onSubmit)}
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

      <Button size='md' className='col-span-2' wide>
        Create
      </Button>
    </form>
  );
}
