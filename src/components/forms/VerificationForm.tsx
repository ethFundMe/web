'use client';

import { handleVerificationRequest } from '@/actions';
import { REGEX_CODES } from '@/lib/constants';
import { userStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Switch } from '../ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export default function VerificationForm({
  canVerify,
}: {
  canVerify: boolean;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('GH');
  const { push } = useRouter();
  const { user } = userStore();

  useEffect(() => {
    if (user?.isVerified) {
      push(`/dashboard/${user.ethAddress}`);
    }
  }, [user, push]);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((response) => {
        if (!response?.country) return;
        setSelectedCountry(response.country ?? 'GH');
      })
      .catch((data) => {
        console.log(`Request failed:, ${{ data }}`);
      });
  }, [selectedCountry]);

  const formSchema = z.object({
    fullname: z.string({ required_error: 'Enter your full name' }),
    email: z
      .string({ required_error: 'Email is required' })
      .regex(REGEX_CODES.email, {
        message: 'Enter a valid email address',
      }),
    phoneNumber: z
      .string({ required_error: 'Phone number is required' })
      .regex(REGEX_CODES.intlPhoneNumber, {
        message: 'Enter a valid phone number',
      }),
    agree: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      fullname: user?.fullName || '',
      agree: false,
      phoneNumber: '',
      email: user?.email || '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({
    fullname,
    agree,
    email,
    phoneNumber,
  }) => {
    setSubmitting(true);
    try {
      const res = await handleVerificationRequest({
        fullName: fullname,
        email,
        phoneNumber,
        agree,
        userId: user?.id as string,
      });
      if (res.success) {
        toast.success(res.message as string);
        if (user) {
          push(`/dashboard/${user.ethAddress}`);
        }
        setSubmitting(false);
      } else {
        toast.error(res.message as string);
        setSubmitting(false);
      }
    } catch (e) {
      setSubmitting(false);
      console.log('Error', e);
    }
  };

  return (
    <div className='pb-20'>
      <Form {...form}>
        <form
          className='mx-auto mt-5 grid grid-cols-2 gap-5 rounded-md border border-neutral-300 p-3 sm:max-w-xl sm:gap-8 sm:p-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder='Enter your full name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='col-span-2 sm:col-span-1'>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder='Enter your email address'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className='col-span-2 sm:col-span-1'>
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className='hidden items-center gap-2 pb-1 md:flex'>
                        <span>Phone number</span>
                        <AiOutlineExclamationCircle />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Example: +1941234567</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Popover>
                    <PopoverTrigger className='flex items-center gap-2 pb-1 md:hidden'>
                      <span>Phone number</span>
                      <AiOutlineExclamationCircle />
                    </PopoverTrigger>
                    <PopoverContent className='w-fit px-3 py-2 text-sm'>
                      <p>Example: +194234567</p>
                    </PopoverContent>
                  </Popover>
                </>

                <FormControl>
                  <>
                    <PhoneInput
                      inputClass='input'
                      containerStyle={{
                        border: 'none',
                        margin: 0,
                        marginTop: 5,
                        width: '100%',
                      }}
                      inputStyle={{
                        border: '1px solid rgb(226,232,240)',
                        height: '2.5rem',
                        width: '100%',
                      }}
                      buttonStyle={{
                        background: 'rgb(245,245,245)',
                        border: '1px solid rgb(226,232,240)',
                        paddingRight: '3px',
                      }}
                      {...field}
                      onChange={(e) => {
                        field.onChange(`+${e}`);
                      }}
                      country={selectedCountry.toLowerCase()}
                      countryCodeEditable={false}
                    />
                  </>
                </FormControl>
                {/* <FormMessage /> */}
                <span className='text-sm font-medium text-red-500 dark:text-red-900'>
                  {form.formState.errors.phoneNumber &&
                    form.formState.errors.phoneNumber.message}
                </span>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='agree'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormDescription className='text-xs'>
                  I have read and agreed to the{' '}
                  <Link
                    href='/legal/terms-and-conditions'
                    className='text-primary-default'
                  >
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href='/legal/privacy-policy'
                    className='text-primary-default'
                  >
                    Privacy Policy
                  </Link>
                </FormDescription>
                <div className='flex items-center gap-x-2'>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormLabel>I agree</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button
            disabled={(!form.watch('agree') && !canVerify) || submitting}
            className='pointer-events-auto col-span-2 w-full cursor-pointer disabled:pointer-events-auto'
          >
            {submitting ? (
              <span className='flex items-center gap-2'>
                <span>Submitting</span>

                <div className='h-3.5 w-3.5 animate-spin rounded-full border border-t-0 border-white'></div>
              </span>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
