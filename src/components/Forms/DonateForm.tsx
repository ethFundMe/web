import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '../Button';
import { InputGroup } from '../formElements/InputGroup';
import { DonateFormProps } from './types';

type DonateFormValues = {
  campaignID: string;
  amount: number;
};

export default function DonateForm({ campaignID, amount }: DonateFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DonateFormValues>();

  const onSubmit: SubmitHandler<DonateFormValues> = (formData) => {
    toast.success('Donated');
    console.log({ formData });
  };

  return (
    <form
      className='w-full max-w-md bg-white p-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={cn(TextSizeStyles.h3, 'text-center')}>
        Donate to campaign
      </h2>

      <div className='mt-5 space-y-4'>
        <InputGroup
          {...register('campaignID', { required: 'Campaign ID is required' })}
          defaultValue={campaignID}
          placeholder='Enter campaign ID'
          error={errors.campaignID?.message}
        />

        <InputGroup
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

        <Button wide>Donate</Button>
      </div>
    </form>
  );
}
