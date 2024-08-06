/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { REGEX_CODES } from '@/lib/constants';
import { updateUser } from '@/lib/queries';
import { userStore } from '@/store';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { Button } from './inputs';
// import { Button as Btn } from './ui/button';
import {
  isFaceBookProfileLink,
  isInstagramProfileLink,
  isTwitterProfileLink,
} from '@/lib/utils';
import { TrashIcon } from 'lucide-react';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Textarea } from './ui/textarea';

export type TSocialMediaPlatform = {
  platform: string;
  icon: ReactNode;
};
const findSocialMediaPlatform = (url: string): TSocialMediaPlatform => {
  if (isTwitterProfileLink(url)) {
    return {
      platform: 'Twitter',
      icon: <BsTwitterX className='absolute right-3 top-2.5' />,
    };
  } else if (isInstagramProfileLink(url)) {
    return {
      platform: 'Instagram',
      icon: <FaInstagram className='absolute right-3 top-2.5' />,
    };
  } else if (isFaceBookProfileLink(url)) {
    return {
      platform: 'Facebook',
      icon: <FaFacebook className='absolute right-3 top-2.5' />,
    };
  } else {
    return {
      platform: 'Link',
      icon: <></>,
    };
  }
};

type FormStatus =
  | 'Uploading profile picture'
  | 'Uploading banner'
  | 'Saving changes';

const efm_endpoint = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT;

export default function UpdateProfileForm({ user }: { user: User }) {
  const formSchema = z.object({
    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(2)
      .max(250),
    username: z
      .string({ required_error: 'Username is required' })
      .regex(REGEX_CODES.username, {
        message: 'Username can only contain letters, numbers, and underscores.',
      })
      .min(2)
      .max(16),
    socialLinks: z
      .string({
        description: 'Social media link',
        required_error: 'link is required',
      })
      .array()
      .optional(),
    email: z
      .string()
      .regex(REGEX_CODES.email, { message: 'Enter a valid email' }),
    bio: z
      .string()
      .max(450, { message: 'Bio is limited to 450 characters' })
      .optional(),
  });

  const { setUser } = userStore();
  const token = getCookie('efmToken');

  const [formStatus, setFormStatus] = useState<FormStatus | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName ?? '',
      bio: user.bio ?? '',
      username: user.username ?? '',
      email: user.email ?? '',
      socialLinks: user.social_links ?? [''],
    },
    mode: 'onChange',
  });

  const {
    formState: { dirtyFields, isDirty },
  } = form;
  // const { isDirty } = formState;

  console.log(form.watch());
  const router = useRouter();

  async function updateUserProfile(values: z.infer<typeof formSchema>) {
    setFormStatus('Saving changes');

    if (dirtyFields.username) {
      // check if username already exists
      // if yes, display error message
      // if no, proceed with updating the username
      const usernameCheckRes = await fetch(
        `${efm_endpoint}/api/check/username/${values.username}`
      );

      if (!usernameCheckRes.ok) {
        setFormStatus(null);
        form.reset();
        return toast.error('username already exists');
      }
    }
    if (isDirty) {
      updateUser({
        bio: values.bio,
        email: values.email,
        ethAddress: user.ethAddress,
        username: values.username,
        fullName: values.fullName,
        token: token || '',
        social_links: values.socialLinks || [],
      })
        .then((data) => {
          // Reset form and navigate to the dashboard
          setFormStatus(null);
          setUser(data);
          console.log(values.socialLinks);
          form.reset();
          toast.success('Profile updated');
          router.push(`/dashboard/${data.ethAddress}`);
        })
        .catch((error) => {
          if (process.env.NODE_ENV !== 'development') {
            console.log(`Failed to update profile: ${error}`);
          }
          console.log('Failed to update profile');
          setFormStatus(null);
          toast.error('Failed to update profile');
        });
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUserProfile(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto w-full space-y-4 rounded-md border border-neutral-300 p-3 sm:max-w-xl sm:p-5 md:py-4'
      >
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your fullName' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Enter your username' {...field} />
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
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='Enter your email'
                  {...field}
                  disabled={!!user?.email}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='socialLinks'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Links</FormLabel>
              <FormControl>
                {/* Social links input components will go here */}
                <SocialLinksManager
                  value={field.value}
                  onChange={field.onChange}
                  max={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Describe yourself and what you do'
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={!!formStatus || !isDirty}
          className='block w-full disabled:cursor-not-allowed disabled:bg-opacity-50'
        >
          {formStatus ?? 'Save'}
        </Button>
      </form>
    </Form>
  );
}

const SocialLinksManager = ({
  value,
  onChange,
  max,
}: {
  value: string[] | undefined;
  onChange: (...event: any[]) => void;
  max: number;
}) => {
  const [links, setLinks] = useState(value || ['']);

  const addLink = () => {
    if (links.every((link) => link.trim() === '')) {
      return toast.error('url field is empty');
    }
    if (links.length < max && links.every((link) => link.trim() !== '')) {
      setLinks([...links, '']);
      onChange([...links, '']);
    }
  };

  const updateLink = (index: number, newValue: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = newValue;
    setLinks(updatedLinks);
    onChange(updatedLinks);
  };
  const deleteLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    onChange(updatedLinks);
  };

  return (
    <div>
      {links.map((link, index) => {
        const { icon } = findSocialMediaPlatform(link);
        return (
          <div key={index} className='mb-1 flex gap-2'>
            <div className='relative w-full'>
              <Input
                type='url'
                placeholder='Enter social link'
                value={link}
                className='w-full'
                onChange={(e) => updateLink(index, e.target.value)}
              />
              {icon}
            </div>
            <div className='flex gap-1'>
              {links.length > 1 && (
                <button
                  onClick={() => deleteLink(index)}
                  type='button'
                  // variant="ghost"
                  // size=""
                >
                  <TrashIcon className='text-rose-500' />
                </button>
              )}
              {links.length < max && links.length - 1 === index && (
                <button
                  className='h-full w-10 rounded-md bg-primary-default text-white '
                  onClick={addLink}
                  type='button'
                >
                  +
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
