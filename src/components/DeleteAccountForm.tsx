'use client';

import { cn } from '@/lib/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';

type FormSchema = { confirmText: string };

export const DeleteAccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>();

  const onSubmit: SubmitHandler<FormSchema> = () => {
    toast.success('Account deleted');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'w-full max-w-lg space-y-3 rounded-lg border p-4 transition-all duration-150 ease-in',
        errors.confirmText ? 'border border-red-500' : 'border-slate-300'
      )}
    >
      <p>
        Type <span className='text-red-500'>&quot;delete my account&quot;</span>{' '}
        to confirm
      </p>

      <Input
        className={cn(
          'transition-all duration-150  ease-in-out focus-visible:ring-1',
          errors.confirmText && 'focus-visible:ring-red-400'
        )}
        {...register('confirmText', {
          required: 'Enter required text',
          pattern: {
            value: /delete my account$/,
            message: 'Enter required text',
          },
        })}
      />

      {errors.confirmText && (
        <p className='text-sm text-red-500'>{errors.confirmText.message}</p>
      )}

      <Button
        variant={errors.confirmText ? 'ghost' : 'destructive'}
        disabled={!!errors.confirmText}
      >
        Delete my account
      </Button>
    </form>
  );
};
