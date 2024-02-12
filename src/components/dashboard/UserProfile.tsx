'use client';

import { cn, formatWalletAddress } from '@/lib/utils';
import { User } from '@/types';
import { Eye, RefreshCcw, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useAccount } from 'wagmi';
import { Container } from '../Container';
import UserCampaignCard from '../UserCampaignCard';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';

export const UserProfile = ({ user }: { user: User }) => {
  const { address } = useAccount();

  if (!user.ethAddress && !address) notFound();

  return (
    <div className='w-full'>
      <div className='flex-1 rounded-md'>
        <div className='header'>
          <div
            className='banner group flex h-[calc(100vw*0.5)] max-h-[500px] flex-col items-end overflow-hidden md:h-72 md:max-h-max'
            style={{
              background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7),rgba(0,0,0,0.5)),url(${
                user.bannerUrl ?? '/images/efm-header.png'
              }) center center/cover no-repeat`,
            }}
          >
            <div className='-mb-10 mt-auto flex w-fit gap-2 bg-white p-2 duration-200 ease-in-out group-hover:-mb-0'>
              <Dialog>
                <DialogTrigger>
                  <span title='Change banner' className='cursor-pointer'>
                    <RefreshCcw />
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <Image
                    className='h-full w-full object-cover'
                    src={user.bannerUrl ?? '/images/efm-header.png'}
                    height={150}
                    width={150}
                    alt='user-pfp'
                  />
                </DialogContent>
              </Dialog>
              <span
                title='Remove banner'
                className='cursor-pointer text-red-500'
              >
                <Trash />
              </span>
            </div>
          </div>

          <Container>
            <div className='flex flex-col gap-4 py-4 md:flex-row md:items-center lg:py-8'>
              <Dialog>
                <DialogTrigger className='w-fit'>
                  <div className='image group relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-slate-300 shadow shadow-slate-200 md:h-36 md:w-36'>
                    <Image
                      className='h-full w-full object-cover'
                      src={user.profileUrl ?? '/images/pfp.svg'}
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
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <Image
                    className='h-full w-full object-cover'
                    src={'/images/pfp.svg'}
                    height={500}
                    width={500}
                    alt='user-pfp'
                  />
                </DialogContent>
              </Dialog>

              <div className='w-full'>
                <div className='flex justify-between'>
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

                  {!user.isVerified && (
                    <Button variant='secondary'>
                      <Link href='/verify'>Get verified</Link>
                    </Button>
                  )}
                </div>

                <p className='text-slate-500'>
                  {formatWalletAddress(user.ethAddress)}
                </p>

                {user.bio && (
                  <ScrollArea
                    className={cn(
                      'rounded-md bg-slate-50 p-1',
                      user.bio.split(' ').length > 20 ? 'h-20' : 'h-12'
                    )}
                  >
                    <p className='max-w-[700px] text-sm'>{user.bio}</p>
                  </ScrollArea>
                )}
              </div>
            </div>

            <div className='mt-8 space-y-6'>
              <h2 className='text-xl font-bold'>My campaigns</h2>
              {user.campaigns.length ? (
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  {user.campaigns.map((_) => (
                    <UserCampaignCard campaign={_} key={_.id} />
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
          </Container>
        </div>
      </div>
    </div>
  );
};
