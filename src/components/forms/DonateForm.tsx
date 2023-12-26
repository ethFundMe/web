import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '../Button';
import { InputGroup } from '../formElements/InputGroup';
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
    // console.log({ formData });
  };

  return (
    <form
      className='w-full space-y-4 bg-white'
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputGroup
        {...register('campaignID')}
        className='hidden'
        placeholder='Enter campaign ID'
        error={errors.campaignID?.message}
      />

      <InputGroup
        label='Amount in ETH'
        id='amount'
        type='number'
        step={0.000001}
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
