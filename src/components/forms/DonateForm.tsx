import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button, Input } from '../inputs';
import { DonateFormProps } from './types';

type DonateFormValues = {
  campaignID: number;
  amount: number;
};

export default function DonateForm({
  campaignID,
  amount,
  customClose,
}: DonateFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DonateFormValues>({
    defaultValues: {
      campaignID,
      amount: 0.000001,
    },
  });

  const onSubmit: SubmitHandler<DonateFormValues> = (formData) => {
    toast.success(
      `Donated ${formData.amount}ETH to Campaign ${formData.campaignID}`
    );
    console.log({ formData });
  };

  return (
    <form
      className='w-full space-y-4 bg-white'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={cn(TextSizeStyles.h3, 'text-center')}>
        Donate to campaign
      </h2>

      <div className='mt-5 space-y-4'>
        <Input
          {...register('campaignID', { required: 'Campaign ID is required' })}
          defaultValue={campaignID}
          placeholder='Enter campaign ID'
          error={errors.campaignID?.message}
        />
      </div>

      <Input
        type='number'
        step='any'
        {...register('amount', {
          required: 'Amount is required',
          min: {
            value: 0.000001,
            message: 'Enter an amount larger than 0.000001 ETH',
          },
        })}
        error={errors.amount?.message}
        defaultValue={amount}
        placeholder='Enter an amount in ETH'
      />

      {customClose ?? <Button wide>Donate</Button>}
    </form>
  );
}
