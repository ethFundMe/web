/* eslint-disable @typescript-eslint/no-loss-of-precision */
'use client';

import { formatWalletAddress } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { formatEther } from 'viem';

export default function LiveDonations() {
  const donations = useMemo(
    () => [
      {
        id: 0,
        address: '0x3434jkb34bkj34',
        amount: 32439882432434324,
        time: '9:10pm',
      },
      {
        id: 1,
        address: '0x3434jkb34bkj34',
        amount: 32439882432434324,
        time: '9:09pm',
      },
      {
        id: 2,
        address: '0x3434jkb34bkj34',
        amount: 432439882432434324,
        time: '9:08pm',
      },
      {
        id: 3,
        address: '0x3434jkb34bkj34',
        amount: 13432439882432434324,
        time: '9:07pm',
      },
      {
        id: 4,
        address: '0x3434jkb34bkj34',
        amount: 3432439882432434324,
        time: '9:06pm',
      },
      {
        id: 5,
        address: '0x3434jkb34bkj34',
        amount: 1232439882432434324,
        time: '9:05pm',
      },
      {
        id: 6,
        address: '0x3434jkb34bkj34',
        amount: 23432439882432434324,
        time: '9:04pm',
      },
      {
        id: 7,
        address: '0x3434jkb34bkj34',
        amount: 3432439882432434324,
        time: '9:03pm',
      },
      {
        id: 8,
        address: '0x3434jkb34bkj34',
        amount: 4332439882432434324,
        time: '9:02pm',
      },
      {
        id: 9,
        address: '0x3434jkb34bkj34',
        amount: 33432439882432434324,
        time: '9:01pm',
      },
      {
        id: 10,
        address: '0x3434jkb34bkj34',
        amount: 123432439882432434324,
        time: '9:00pm',
      },
    ],
    []
  );

  const [index, setIndex] = useState(4);
  const [dts, setDts] = useState<
    {
      id: number;
      address: string;
      amount: number;
      time: string;
    }[]
  >(donations.slice(-4));

  const { ref, inView } = useInView();

  const format = (num: number) => {
    return parseFloat(formatEther(BigInt(num))).toFixed(3);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!inView) return;
        if (index >= 0) {
          setDts((prev) => [
            donations[index],
            ...prev.slice(0, prev.length - 1),
          ]);
          setIndex((prev) => prev - 1);
        }
      },
      Math.round(Math.random() * 10000)
    );

    return () => clearInterval(interval);
  }, [donations, index, inView]);

  return (
    <div>
      <h2 className='text-center text-2xl font-light text-primary-dark'>
        Live Donations
      </h2>

      <ul
        ref={ref}
        className='relative mx-auto h-[210px] max-w-sm overflow-hidden overflow-y-hidden text-primary-default'
      >
        <AnimatePresence initial={false}>
          {dts.map((i) => (
            <motion.li
              layout
              animate={{ x: [50, 0], opacity: [0, 1] }}
              exit={{
                y: 20,
                opacity: 0,
                transition: { duration: 0.15 },
              }}
              transition={{ type: 'spring', damping: 14 }}
              key={i.id}
            >
              {/* Update with real tx when available */}
              <Link
                href='https://etherscan.io/tx/0xa04bea27c6a906dcad8861c951e7c870907b880f47ffb2e76db36d2f8b3c3910'
                target='_blank'
                rel='noreferrer'
                title='View transaction details'
                className='flex items-center gap-2 border-b border-slate-600 py-3 text-sm transition-all duration-150 ease-in hover:opacity-60 sm:text-base'
              >
                <span>
                  <FaEthereum size={20} />
                </span>
                <span>
                  {formatWalletAddress(i.address as `0x${string}`, 'short')}{' '}
                  <span className='hidden sm:inline'>donated</span>{' '}
                  <span className='inline sm:hidden'> - </span>{' '}
                  {format(i.amount)}ETH
                </span>
                <span className='ml-auto text-xs sm:text-sm'>{i.time}</span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>

        {/* <div className='absolute bottom-0 h-20 w-full bg-gradient-to-b from-transparent to-white'></div> */}
      </ul>
    </div>
  );
}
