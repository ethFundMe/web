'use client';

import { useCountdown } from '@/lib/hook/useCountdown';
import { AnimatePresence, motion } from 'framer-motion';
// import { publicClient } from './client'
import { EthFundMe } from '@/lib/abi';
import { ethChainId } from '@/lib/constant';
import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

const publicClient = createPublicClient({
  chain: ethChainId === 1 ? mainnet : sepolia,
  transport: http(),
});

export const ValidatorCountdown = () => {
  const [jsonDate, setJsonDate] = useState('');
  const [expired, setExpired] = useState(false);
  const [days, hours, minutes, seconds] = useCountdown(new Date(jsonDate));

  const getDfNextUpdate = async () => {
    const data = await publicClient.readContract({
      address: process.env.NEXT_PUBLIC_ETH_FUND_ME_CONTRACT_ADDRESS || '',
      abi: EthFundMe,
      functionName: 'DF_NEXT_UPDATE',
    });

    const myDate = new Date(Number(data) * 1000);
    console.log(typeof data);
    console.log(typeof myDate);
    console.log(myDate.toJSON());
    return myDate.toJSON();
  };

  useEffect(() => {
    async function getDateString() {
      const dateString = await getDfNextUpdate();
      setJsonDate(dateString);
      if (days + hours + minutes + seconds <= 0) {
        setExpired(true);
      }
    }
    getDateString();
  }, []);

  // useEffectOnce(() => {
  //   if(days + hours + minutes + seconds <= 0) setExpired(true);
  // });

  const Obj = { days, hours, minutes, seconds };

  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <div className='flex gap-4'>
        <AnimatePresence mode='popLayout' initial={false}>
          {Object.entries(Obj).map(([key, value]) => (
            <div key={key}>
              <div className='flex flex-col items-center font-bold uppercase'>
                <motion.p
                  key={value}
                  animate={{
                    scale: [0.9, 1],
                    transition: {
                      type: 'spring',
                      damping: 30,
                    },
                  }}
                  className='text-4xl text-primary-default sm:text-5xl'
                >
                  {String(value).padStart(2, '0')}
                </motion.p>

                <p className='text-sm sm:text-base'>{key}</p>
              </div>
            </div>
          ))}
        </AnimatePresence>
      </div>
      <button
        className={`grid h-24 w-24 flex-shrink-0 place-content-center rounded-full ${
          expired
            ? 'bg-neutral-400 hover:bg-neutral-400/80'
            : 'bg-green-600 hover:bg-green-400/80'
        } text-sm text-white sm:h-32 sm:w-32 sm:text-base`}
      >
        UPDATE
      </button>
    </div>
  );
};
