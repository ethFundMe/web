'use client';

import { resetUser } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { userStore } from '@/store';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useRefs from 'react-use-refs';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';

type FormSchema = { confirmText: string };

export const DeleteAccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>();
  const { user } = userStore();
  const [triggerRef, closeRef] = useRefs<HTMLButtonElement>(null);
  const [deleting, setDeleting] = useState(false);

  const { push } = useRouter();
  const token = getCookie('efmToken') || '';

  const onSubmit: SubmitHandler<FormSchema> = () => {
    if (triggerRef.current) triggerRef.current.click();
  };

  async function handleDeleteAccount() {
    setDeleting(true);
    if (!user) return;

    try {
      const res = await resetUser(user.ethAddress, token);
      closeRef.current?.click();
      toast.success(res.message);
      push('/');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error('Failed to make delete request');
    } finally {
      setDeleting(false);
    }
    return;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'w-full max-w-lg space-y-3 rounded-lg border p-4 transition-all duration-150 ease-in',
          errors.confirmText ? 'border border-red-500' : 'border-slate-300'
        )}
      >
        <p>
          Type{' '}
          <span className='text-red-500'>&quot;delete my account&quot;</span> to
          confirm
        </p>

        <div className='flex flex-col gap-2 sm:flex-row'>
          <div className='flex-1'>
            <Input
              className={cn(
                'transition-all duration-150  ease-in-out focus-visible:ring-1',
                errors.confirmText && 'focus-visible:ring-red-400'
              )}
              placeholder='delete my account'
              {...register('confirmText', {
                required: 'Enter required text',
                pattern: {
                  value: /delete my account$/,
                  message: 'Enter required text',
                },
              })}
            />

            {errors.confirmText && (
              <p className='text-sm text-red-500'>
                {errors.confirmText.message}
              </p>
            )}
          </div>

          <Button
            variant={errors.confirmText ? 'ghost' : 'destructive'}
            disabled={!!errors.confirmText || deleting}
          >
            {deleting ? 'Deleting' : 'Delete'}
          </Button>
        </div>
      </form>

      <Dialog>
        <DialogTrigger ref={triggerRef} className='hidden'></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm delete account</DialogTitle>
            <DialogDescription>This action is irreversible</DialogDescription>
          </DialogHeader>

          <div className='grid grid-cols-2 gap-4'>
            <Button
              variant='destructive'
              disabled={!!errors.confirmText || deleting}
              onClick={handleDeleteAccount}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
            <Button asChild variant='outline'>
              <DialogClose ref={closeRef}>Close</DialogClose>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
