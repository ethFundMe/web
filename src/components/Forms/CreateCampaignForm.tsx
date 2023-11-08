'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../Button';
import { InputGroup } from '../FormElements/InputGroup';
import { TextAreaInputGroup } from '../FormElements/TextArea';
import { CreateCampaignFormFields } from './types';

export default function CreateCampaignForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateCampaignFormFields>();

  const router = useRouter();

  const onSubmit: SubmitHandler<CreateCampaignFormFields> = (formData) => {
    // save to db
    if (
      window.confirm(`Saved "${formData.title}" to db \nSee all campaigns?`)
    ) {
      router.push('/campaigns');
    }

    reset();
  };

  return (
    <form
      className='mx-auto mt-5 max-w-lg space-y-8 rounded-md border border-neutral-300 p-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='space-y-2'>
        <InputGroup
          id='title'
          label='Title'
          {...register('title', { required: 'Title is required' })}
          placeholder='Enter your campaign title'
        />

        {errors.title && (
          <p className='text-sm text-red-500'>{errors.title.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <TextAreaInputGroup
          placeholder='Enter a description for your campaign'
          {...register('description', { required: 'Description is required' })}
          rows={7}
        />

        {errors.description && (
          <p className='text-sm text-red-500'>{errors.description.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <InputGroup
          id='goal'
          type='number'
          label='Goal (ETH)'
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
        />

        {errors.goal && (
          <p className='text-sm text-red-500'>{errors.goal.message}</p>
        )}
      </div>

      <Button size='md' wide>
        Create
      </Button>
    </form>
  );
}
