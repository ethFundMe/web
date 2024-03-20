'use client';

import { updateUser } from '@/actions';
import { cn, deleteFromCloudinary, formatWalletAddress } from '@/lib/utils';
import { Campaign, User } from '@/types';
import { Eye, RefreshCcw, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useRefs from 'react-use-refs';
import { useAccount } from 'wagmi';
import { Container } from '../Container';
import DnDUpload from '../DnDUpload';
import EarningsCard from '../EarningsCard';
import ImageWithFallback from '../ImageWithFallback';
import UserCampaignCard from '../UserCampaignCard';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../ui/dialog';

export const UserProfile = ({
  user,
  campaigns,
}: {
  user: User;
  campaigns: Campaign[];
}) => {
  const { address } = useAccount();
  const router = useRouter();
  const [closeBannerRef, closePfpRef] = useRefs<HTMLButtonElement>(null);
  const [showPfpUpload, setShowPfpUpload] = useState(false);
  const [updatingImage, setUpdatingImage] = useState([false, false]);

  // const { setUser } = userStore();

  // setUser(user);
  // console.log(user);

  const handlePfpUpdate = (profileUrl: string[]) => {
    updateUser({
      ethAddress: user.ethAddress,
      fullName: user.fullName,
      email: user.email,
      profileUrl: profileUrl[0],
    })
      .then(() => {
        toast.success('Updated profile picture');
        router.refresh();
        if (closePfpRef.current) {
          closePfpRef.current.click();
        }
        setShowPfpUpload(false);
      })
      .catch(() => {
        toast.success('Failed to update profile picture');
      });
  };

  const handleBannerUpdate = (bannerUrl: string[]) => {
    updateUser({
      ethAddress: user.ethAddress,
      fullName: user.fullName,
      email: user.email,
      bannerUrl: bannerUrl[0],
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

  // if (address === user.ethAddress)
  //   return router.push(`/dashboard/${user.ethAddress}`);

  return (
    <div className='mb-20 w-full'>
      <div className='flex-1 rounded-md'>
        <div className='header'>
          <div
            className='banner group flex h-[calc(40vw)] max-h-[16rem] flex-col items-end overflow-hidden md:h-64 md:max-h-max'
            style={{
              background: user.bannerUrl
                ? `url(${user.bannerUrl}) center center/cover no-repeat`
                : '#8c929a',
            }}
          >
            {user.ethAddress === address && (
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
              <Dialog>
                <DialogTrigger className='group relative -mt-24 h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-white bg-slate-300 shadow shadow-slate-200 md:h-36 md:w-36'>
                  <Image
                    className='h-full w-full object-cover'
                    src={user.profileUrl || '/images/user-pfp.png'}
                    height={500}
                    width={500}
                    alt='user-pfp'
                  />
                  <div className='absolute left-0 top-0 grid h-full w-full place-content-center bg-black/50 text-center text-sm text-white opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100'>
                    <span className='mx-auto block'>
                      <Eye />
                    </span>
                    View
                  </div>
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
                                setUpdatingImage((prev) => [true, prev[1]]);
                                const res = await deleteFromCloudinary(
                                  user.profileUrl as string
                                );

                                if (res.ok) {
                                  updateUser({
                                    ethAddress: user.ethAddress,
                                    email: user.email,
                                    fullName: user.fullName,
                                    profileUrl: undefined,
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
                                      toast.error('Failed to update profile', {
                                        position: 'top-right',
                                      });
                                      setUpdatingImage((prev) => [
                                        false,
                                        prev[1],
                                      ]);
                                    });
                                } else {
                                  throw new Error('Failed to update image');
                                }
                              } catch (err) {
                                console.log(err);
                                toast.error('Failed to update image', {
                                  position: 'top-right',
                                });
                                setUpdatingImage((prev) => [false, prev[1]]);
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
                    <DnDUpload handleUpload={handlePfpUpdate} maxFiles={1} />
                  )}

                  <DialogClose
                    ref={closePfpRef}
                    className='pointer-events-none absolute opacity-0'
                  >
                    Close
                  </DialogClose>
                </DialogContent>
              </Dialog>

              {!user.isVerified && address === user.ethAddress && (
                <Button>
                  <Link href='/verify'>Get verified</Link>
                </Button>
              )}
            </div>

            <div className='flex w-full justify-between'>
              <div>
                <div className='flex items-center gap-1'>
                  <p className='text-xl font-bold md:text-2xl lg:text-3xl'>
                    {user.fullName}
                  </p>

                  {user.isVerified && (
                    <Image
                      className='h-auto w-5 md:w-6'
                      src='/images/verified.svg'
                      width={30}
                      height={30}
                      alt='...'
                    />
                  )}
                </div>

                <p className='text-slate-500'>
                  {formatWalletAddress(user.ethAddress)}
                </p>

                {user.bio && (
                  <p className='max-w-[700px] text-sm'>{user.bio}</p>
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
              <h2 className='text-xl font-bold'>Campaigns</h2>
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
                <div className='grid min-h-[10rem]  w-full place-content-center'>
                  <p className={'mb-4 text-center text-xl text-gray-400'}>
                    No campaigns started yet
                  </p>
                </div>
              )}
            </div>
            <div
              className={cn(user.ethAddress !== address && 'hidden', 'hidden')}
            >
              <EarningsCard />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
