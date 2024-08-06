'use client';

import { updateUser } from '@/lib/queries';
import {
  cn,
  deleteFromCloudinary,
  formatWalletAddress,
  isFaceBookProfileLink,
  isInstagramProfileLink,
  isTwitterProfileLink,
} from '@/lib/utils';
import { userStore } from '@/store';
import { Campaign, User } from '@/types';
import { getCookie } from 'cookies-next';
import { RefreshCcw, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import toast from 'react-hot-toast';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaLink } from 'react-icons/fa';
import useRefs from 'react-use-refs';
import { useAccount } from 'wagmi';
import { Container } from '../Container';
import DnDUpload from '../DnDUpload';
import EarningsCard from '../EarningsCard';
import ImageWithFallback from '../ImageWithFallback';
import { TSocialMediaPlatform } from '../UpdateProfileForm';
import UserCampaignCard from '../UserCampaignCard';
import { Dock, DockIcon } from '../magicui/dock';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../ui/dialog';
// import { Separator } from '@radix-ui/react-dropdown-menu';
import { buttonVariants } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export type IconProps = React.HTMLAttributes<SVGElement>;

// const Icons = {
//   calendar: (props: IconProps) => <CalendarIcon {...props} />,
//   email: (props: IconProps) => <MailIcon {...props} />,
//   linkedin: (props: IconProps) => (
//     <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
//       <title>LinkedIn</title>
//       <path
//         fill="currentColor"
//         d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
//       />
//     </svg>
//   ),
//   x: (props: IconProps) => (
//     <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
//       <title>X</title>
//       <path
//         fill="currentColor"
//         d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
//       />
//     </svg>
//   ),
//   youtube: (props: IconProps) => (
//     <svg
//       width="32px"
//       height="32px"
//       viewBox="0 0 32 32"
//       fill="currentColor"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <title>youtube</title>
//       <path d="M29.41,9.26a3.5,3.5,0,0,0-2.47-2.47C24.76,6.2,16,6.2,16,6.2s-8.76,0-10.94.59A3.5,3.5,0,0,0,2.59,9.26,36.13,36.13,0,0,0,2,16a36.13,36.13,0,0,0,.59,6.74,3.5,3.5,0,0,0,2.47,2.47C7.24,25.8,16,25.8,16,25.8s8.76,0,10.94-.59a3.5,3.5,0,0,0,2.47-2.47A36.13,36.13,0,0,0,30,16,36.13,36.13,0,0,0,29.41,9.26ZM13.2,20.2V11.8L20.47,16Z" />
//     </svg>
//   ),
//   github: (props: IconProps) => (
//     <svg viewBox="0 0 438.549 438.549" {...props}>
//       <path
//         fill="currentColor"
//         d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
//       ></path>
//     </svg>
//   ),
// };

// const DATA = {
//   navbar: [
//     { href: '#', icon: HomeIcon, label: 'Home' },
//     { href: '#', icon: PencilIcon, label: 'Blog' },
//   ],
//   contact: {
//     social: {
//       GitHub: {
//         name: 'GitHub',
//         url: '#',
//         icon: Icons.github,
//       },
//       LinkedIn: {
//         name: 'LinkedIn',
//         url: '#',
//         icon: Icons.linkedin,
//       },
//       X: {
//         name: 'X',
//         url: '#',
//         icon: Icons.x,
//       },
//       email: {
//         name: 'Send Email',
//         url: '#',
//         icon: Icons.email,
//       },
//     },
//   },
// };

export const UserProfile = ({
  user,
  campaigns,
}: {
  user: User;
  campaigns: Campaign[];
}) => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [closeBannerRef, closePfpRef] = useRefs<HTMLButtonElement>(null);
  const [showPfpUpload, setShowPfpUpload] = useState(false);
  const [updatingImage, setUpdatingImage] = useState([false, false]);

  const { setUser } = userStore();
  const token = getCookie('efmToken') || '';

  const handlePfpUpdate = (profileUrl: string[]) => {
    updateUser({
      ethAddress: user.ethAddress,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      profileUrl: profileUrl[0],
      token,
      social_links: user.social_links || [],
    })
      .then(() => {
        toast.success('Profile picture updated');
        router.refresh();
        if (closePfpRef.current) {
          closePfpRef.current.click();
        }
        setShowPfpUpload(false);
      })
      .catch((e) => {
        console.log(e);

        toast.error('Failed to update profile picture');
      });
  };

  const handleBannerUpdate = (bannerUrl: string[]) => {
    updateUser({
      ethAddress: user.ethAddress,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      bannerUrl: bannerUrl[0],
      token,
      social_links: user.social_links || [],
    })
      .then(() => {
        toast.success('Banner updated');
        router.refresh();
        if (closeBannerRef.current) {
          closeBannerRef.current.click();
        }
      })
      .catch(() => {
        toast.success('Failed to update banner');
      });
  };

  const loggedIn = isConnected && getCookie('efmToken');
  const isOwner = loggedIn && user.ethAddress === address;
  const findSocialMediaPlatform = (url: string): TSocialMediaPlatform => {
    if (isTwitterProfileLink(url)) {
      return {
        platform: 'Twitter',
        icon: <BsTwitterX className='' />,
      };
    } else if (isInstagramProfileLink(url)) {
      return {
        platform: 'Instagram',
        icon: <FaInstagram className='' />,
      };
    } else if (isFaceBookProfileLink(url)) {
      return {
        platform: 'Facebook',
        icon: <FaFacebook className='' />,
      };
    } else {
      return {
        platform: 'Link',
        icon: <FaLink className='' />,
      };
    }
  };

  return (
    <div className={cn('mb-20 w-full')}>
      {user.isBanned ? (
        <div className='flex h-full min-h-96 items-center justify-center text-lg font-medium'>
          ⛔ User is banned
        </div>
      ) : (
        <div className='flex-1 rounded-md'>
          <div className='header'>
            <div
              className={cn(
                'banner group mx-auto flex h-[calc(40vw)] max-h-[16rem] flex-col items-end overflow-hidden bg-[#8c929a] bg-cover bg-center bg-no-repeat md:h-64 md:max-h-max xl:h-[25rem]',
                !user.bannerUrl && 'opacity-70'
              )}
              style={{
                backgroundImage: user.bannerUrl
                  ? `url(${user.bannerUrl})`
                  : 'url(/user-banner.webp)',
              }}
            >
              {isOwner && (
                <div className='-mt-10 flex w-fit gap-2 bg-white p-2 duration-200 ease-in-out group-hover:-mt-0'>
                  <Dialog>
                    <DialogTrigger>
                      <span title='Change banner' className='cursor-pointer'>
                        <RefreshCcw />
                      </span>
                    </DialogTrigger>
                    <DialogContent className='w-full max-w-2xl'>
                      <div className='relative h-96'>
                        <DnDUpload
                          maxFiles={1}
                          handleUpload={handleBannerUpdate}
                        />
                      </div>
                      <DialogClose
                        ref={closeBannerRef}
                        className='pointer-events-none absolute opacity-0'
                      >
                        Close
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                  <span
                    title='Remove banner'
                    className='cursor-pointer text-red-500'
                  >
                    <Trash />
                  </span>
                </div>
              )}
            </div>

            <Container className='flex flex-col gap-4 py-4 lg:py-8'>
              <div className='flex justify-between'>
                <div className='relative -mt-24 h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-white bg-slate-300 shadow shadow-slate-200 md:h-36 md:w-36'>
                  <Image
                    className='h-full w-full object-cover'
                    src={user.profileUrl || '/images/user-pfp.png'}
                    height={500}
                    width={500}
                    alt='user-pfp'
                  />
                  {loggedIn && user.ethAddress === address && (
                    <Dialog>
                      <DialogTrigger className='group absolute left-0 top-0 h-full w-full'>
                        <div className='absolute left-0 top-0 grid h-full w-full'></div>
                      </DialogTrigger>
                      <DialogContent className='p-0.5'>
                        <div className='group relative flex min-h-[370px] flex-col overflow-hidden'>
                          <ImageWithFallback
                            className={cn(
                              'my-auto w-full object-cover',
                              updatingImage[0] && 'opacity-60'
                            )}
                            src={user.profileUrl ?? ''}
                            fallback='/images/user-pfp.png'
                            height={500}
                            width={500}
                            alt={user.fullName ?? 'profile-picture'}
                          />

                          {updatingImage[0] && (
                            <span className='absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2'>
                              <div className='h-8 w-8 animate-spin rounded-full border-2 border-t-0 border-slate-700'></div>
                            </span>
                          )}

                          {!updatingImage[0] && user.ethAddress === address && (
                            <div className='absolute left-0 top-0 flex gap-2 bg-white p-2 transition-all duration-150 ease-in group-hover:top-0 md:-top-20'>
                              <span
                                title='Change image'
                                className='cursor-pointer'
                                onClick={() => setShowPfpUpload(true)}
                              >
                                <RefreshCcw />
                              </span>

                              {user.profileUrl && (
                                <span
                                  title='Remove image'
                                  className='cursor-pointer text-red-500'
                                  onClick={async () => {
                                    try {
                                      setUpdatingImage((prev) => [
                                        true,
                                        prev[1],
                                      ]);
                                      const res = await deleteFromCloudinary(
                                        user.profileUrl as string
                                      );

                                      if (res.ok) {
                                        updateUser({
                                          ethAddress: user.ethAddress,
                                          email: user.email,
                                          fullName: user.fullName,
                                          username: user.username,
                                          profileUrl: undefined,
                                          token,
                                          social_links: user.social_links || [],
                                        })
                                          .then((res) => {
                                            setUser(res);
                                            toast.success('Profile updated', {
                                              position: 'top-right',
                                            });
                                            setUpdatingImage((prev) => [
                                              false,
                                              prev[1],
                                            ]);

                                            if (closePfpRef.current) {
                                              closePfpRef.current.click();
                                            }
                                            router.refresh();
                                          })
                                          .catch(() => {
                                            toast.error(
                                              'Failed to update profile',
                                              {
                                                position: 'top-right',
                                              }
                                            );
                                            setUpdatingImage((prev) => [
                                              false,
                                              prev[1],
                                            ]);
                                          });
                                      } else {
                                        throw new Error(
                                          'Failed to update image'
                                        );
                                      }
                                    } catch (err) {
                                      console.log(err);
                                      toast.error('Failed to update image', {
                                        position: 'top-right',
                                      });
                                      setUpdatingImage((prev) => [
                                        false,
                                        prev[1],
                                      ]);
                                    }
                                  }}
                                >
                                  <Trash />
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {showPfpUpload && (
                          <DnDUpload
                            handleUpload={handlePfpUpdate}
                            maxFiles={1}
                          />
                        )}

                        <DialogClose
                          ref={closePfpRef}
                          className='pointer-events-none absolute opacity-0'
                        >
                          Close
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                <div className='flex items-center gap-x-8'>
                  {user?.social_links && (
                    <TooltipProvider>
                      <Dock direction='middle'>
                        {/* <Separator className="h-full" /> */}
                        {user?.social_links.map((link, index) => (
                          <DockIcon key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={link}
                                  className={cn(
                                    buttonVariants({
                                      variant: 'ghost',
                                      size: 'icon',
                                    }),
                                    'size-8 rounded-full'
                                  )}
                                  rel='noopener noreferrer'
                                  target='_blank'
                                >
                                  {findSocialMediaPlatform(link).icon}
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{findSocialMediaPlatform(link).platform}</p>
                              </TooltipContent>
                            </Tooltip>
                          </DockIcon>
                        ))}
                      </Dock>
                    </TooltipProvider>
                  )}
                  <Link
                    title='Creator Fee'
                    href={
                      isOwner
                        ? `/dashboard/${user.ethAddress}/creator-fee`
                        : '/about#creator-fee'
                    }
                    className='h-fit rounded-lg bg-primary-default px-5 py-1 text-base font-semibold text-white'
                  >
                    {Number(user.creatorFee)}%
                  </Link>
                </div>
              </div>

              <div className='flex w-full justify-between'>
                <div>
                  <div>
                    <div className='flex items-center gap-1'>
                      <p className='text-lg font-bold leading-none md:text-2xl lg:text-3xl'>
                        {user.fullName.length > 25 && isMobile
                          ? user.fullName.slice(0, 25).concat('...')
                          : user.fullName}
                      </p>
                      {user.isVerified && (
                        <Image
                          className='mt-0.5 h-auto w-5 md:w-6'
                          src='/images/verified.svg'
                          width={30}
                          height={30}
                          alt='...'
                        />
                      )}
                    </div>
                    {user?.username && (
                      <p className='text-gray-500'>@{user.username}</p>
                    )}
                  </div>

                  <p className='mt-2 text-slate-500'>
                    {formatWalletAddress(user.ethAddress)}
                  </p>

                  {user.bio && (
                    <p className='max-w-[700px] text-sm sm:text-base'>
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>
            </Container>

            <Container
              className={cn(
                'mt-8 space-y-6',
                address === user.ethAddress && 'grid'
              )}
            >
              <div className='space-y-6 lg:col-span-9'>
                {campaigns.length ? (
                  <h2 className='text-xl text-primary-default'>
                    These are {isOwner ? 'your' : `${user.fullName}'s`}{' '}
                    campaigns
                  </h2>
                ) : (
                  <p className={'text-xl text-gray-400'}>
                    No campaigns started yet.{' '}
                    <span>
                      <Link
                        className='text-primary-default hover:underline'
                        href='/campaigns/create'
                      >
                        Click here
                      </Link>
                    </span>{' '}
                    to create one
                  </p>
                )}
                {campaigns.length ? (
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {campaigns.map((_) => (
                      <UserCampaignCard
                        campaign={_}
                        variant={
                          user.ethAddress && user.ethAddress === address
                            ? 'user'
                            : 'viewer'
                        }
                        key={_.id}
                      />
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                className={cn(
                  user.ethAddress !== address && 'hidden',
                  'hidden'
                )}
              >
                <EarningsCard />
              </div>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};
