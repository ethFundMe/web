'use client';

import { formatWalletAddress } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useAccount } from 'wagmi';
import { CampaignCard } from '../CampaignCard';
import { Container } from '../Container';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

export const UserProfile = ({ ethAddress }: { ethAddress?: `0x${string}` }) => {
  const { address } = useAccount();

  // if (ethAddress) {
  //   const user = getUserFromDB();
  //   if (!user) notFound();
  // }

  if (!ethAddress && !address) notFound();

  return (
    <div className='w-full'>
      <div className='flex-1 rounded-md'>
        <div className='header'>
          <div className='banner h-40 bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7),rgba(0,0,0,0.5)),url(/images/efm-header.png)] bg-cover bg-center bg-no-repeat md:h-72'></div>

          <Container>
            <div className='flex flex-col gap-4 py-4 md:flex-row md:items-end lg:py-8'>
              <Dialog>
                <DialogTrigger className='w-fit'>
                  <div className='image h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-slate-300 shadow shadow-slate-200 md:h-36 md:w-36'>
                    <Image
                      className='h-full w-full object-cover'
                      src={'/images/pfp.svg'}
                      height={150}
                      width={150}
                      alt='user-pfp'
                    />
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

              <div>
                <div className='flex items-start'>
                  <p className='text-xl font-bold md:text-2xl lg:text-3xl'>
                    John Doe
                  </p>
                  <Image
                    className='h-auto w-[12px] md:w-4'
                    src='/images/verified.svg'
                    width={20}
                    height={20}
                    alt='...'
                  />
                </div>
                <p className='text-slate-500'>
                  {formatWalletAddress(
                    (address || ethAddress) as `0x${string}`
                  )}
                </p>
                <p className='max-w-[700px] text-sm'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Impedit repellat recusandae dicta quod? Aperiam reiciendis
                  explicabo, suscipit cumque ad quibusdam eveniet illum sequi
                  voluptatibus rerum a, quas delectus! Accusamus, dicta.
                </p>
              </div>
            </div>

            <div className='grid min-h-[10rem]  w-full place-content-center'>
              <p className={'mb-4 text-center text-xl text-gray-400'}>
                No campaigns started yet
              </p>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {[].map((_, idx) => (
                <CampaignCard key={idx} campaign={_} />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
