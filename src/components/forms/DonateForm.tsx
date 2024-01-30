import { useFund } from '@/lib/hook';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDebounce } from 'usehooks-ts';
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
    watch,
  } = useForm<DonateFormValues>({
    defaultValues: {
      campaignID,
      amount: 0.000001,
    },
  });

  const fundingAmt = useDebounce(watch('amount'), 500);

  const {
    fundCampaignWrite,
    isLoadingFundCampaign,
    isLoadingFundCampaignTxn,
    isFundCampaignSuccess,
  } = useFund({ id: campaignID, amt: fundingAmt });

  const isLoadingTxn = isLoadingFundCampaign || isLoadingFundCampaignTxn;

  const onSubmit: SubmitHandler<DonateFormValues> = (formData) => {
    if (formData.amount <= 0) {
      toast.error('Fund more than 0 ETH');
      return;
    }

    return fundCampaignWrite?.();
  };

  useEffect(() => {
    if (isFundCampaignSuccess) {
      toast.success('Successfully funded campaign');
      return redirect(`/campaigns/${campaignID}`);
    }
  }, [campaignID, isFundCampaignSuccess]);

  return (
    <form
      className='w-full space-y-4 bg-white'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <div className='mt-5 space-y-4'>
        <Input
          {...register('campaignID', { required: 'Campaign ID is required' })}
          defaultValue={campaignID}
          placeholder='Enter campaign ID'
          error={errors.campaignID?.message}
        />
      </div> */}

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

      {customClose ?? (
        <Button wide>{isLoadingTxn ? 'Donating...' : 'Donate'}</Button>
      )}
    </form>
  );
}
