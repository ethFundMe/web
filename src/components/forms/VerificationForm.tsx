'use client';

import { REGEX_CODES } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { toast } from 'sonner';
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
import { Switch } from '../ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export default function VerificationForm() {
  // [Todo]: country select

  // useEffect(() => {
  //   fetch('https://ipapi.co/json/')
  //     .then((res) => res.json())
  //     .then((response) => {
  //       setSelectedCountry(
  //         countries.find((country) => country.code === response?.country) ??
  //           countries[0]
  //       );
  //     })
  //     .catch((data) => {
  //       console.log('Request failed:', data);
  //     });
  // }, [selectedCountry]);

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
    mode: 'onBlur',
    defaultValues: {
      agree: false,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    toast(
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
    console.log({ data });
  };

  return (
    <div className='pb-20'>
      <Form {...form}>
        <form
          className='mx-auto mt-5 grid grid-cols-2 gap-5 rounded-md border border-neutral-300 p-3 sm:max-w-2xl sm:gap-8 sm:p-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your full name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your email address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className='flex items-center gap-2 pb-1'>
                        <span>Phone number</span>
                        <AiOutlineExclamationCircle />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Example: +233551234567</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>

                <FormControl>
                  <Input placeholder='Enter phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='agree'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-end gap-2'>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormLabel>I agree</FormLabel>
                </div>

                <FormDescription className='text-xs'>
                  I have read and agreed to the{' '}
                  <Link href='#' className='text-primary-default'>
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href='#' className='text-primary-default'>
                    Privacy Policy
                  </Link>
                </FormDescription>
              </FormItem>
            )}
          />
          <Button disabled={!form.watch('agree')} className='col-span-2 w-full'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
