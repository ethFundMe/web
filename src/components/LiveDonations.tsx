/* eslint-disable @typescript-eslint/no-loss-of-precision */
'use client';

import { socket as webSocket } from '@/lib/socketConfig';
import { Donation, DonationResponse } from '@/lib/types';
import { formatWalletAddress, getRelativeTime } from '@/lib/utils';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FaEthereum } from 'react-icons/fa';
import { Socket } from 'socket.io-client';
import { formatEther } from 'viem';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export default function LiveDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const socketRef = useRef<Socket>(null);

  useEffect(() => {
    let socket = socketRef.current;

    if (!socket) {
      socket = webSocket;
      socket.connect();
      socket.on('connect', onConnect);
      socket.on('donation:receieved', onDonationReceived);
      socket.on('disconnect', onDisconnect);
      socket.emit('campaign:donations', {}, onGetDonations);
    }

    function onConnect() {
      if (process.env.NODE_ENV === 'development') {
        console.log('Connected for live donations 🔥');
      }
    }

    function onGetDonations(response: DonationResponse) {
      if (response.status === 'OK') {
        if (response.data) {
          setDonations(response.data);
        }
      } else {
        console.error('Error fetching donations:', response.error);
      }
    }

    function onDonationReceived(response: Donation) {
      setDonations((prev) => [response, ...prev]);
    }

    function onDisconnect() {
      socket = null;
    }

    return () => {
      if (socket) {
        socket.off('connect', onConnect);
        socket.off('campaign:donations', onGetDonations);
        socket.off('disconnect', onDisconnect);
        socket.disconnect();
      }
    };
  }, []);

  // const { ref, inView } = useInView();

  const format = (num: number) => {
    return parseFloat(formatEther(BigInt(num))).toFixed(5);
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-center text-2xl font-light text-primary-dark'>
        Live Donations
      </h2>

      <ul
        // ref={ref}
        className='relative mx-auto h-[250px] max-w-[530px] space-y-2 overflow-hidden overflow-y-hidden text-primary-default'
      >
        {donations.length < 1 && <LoadingIndicator />}
        <AnimatePresence initial={false}>
          {donations.map((i) => (
            <motion.li
              layout
              animate={{ opacity: [0, 1] }}
              exit={{
                y: 20,
                opacity: 0,
                transition: { duration: 0.15 },
              }}
              transition={{ type: 'spring', damping: 14 }}
              key={i.transaction_hash}
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_TNX_LINK}/${i.transaction_hash}`}
                target='_blank'
                rel='noreferrer'
                title='View transaction details'
                className='flex justify-between gap-1 border-b border-slate-200 py-1 text-sm transition-all duration-150 ease-in hover:opacity-60 md:text-base'
              >
                <span className='flex items-center gap-1'>
                  <span>
                    <FaEthereum size={20} />
                  </span>
                  <span>
                    <span className='text-sm md:text-base'>
                      {formatWalletAddress(
                        i.donor,
                        isMobile ? 'short' : 'long'
                      )}{' '}
                    </span>
                    <span className='hidden md:inline'>donated</span>{' '}
                    <span className='inline md:hidden'> — </span>{' '}
                    <span className='text-xs'>{format(i.amount)} ETH</span>
                  </span>
                </span>

                {/* <small>{dayjs(i.created_at).format('HH:mm a')}</small> */}
                <small>{getRelativeTime(i.created_at)}</small>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>

        <div
          className='absolute bottom-0 h-[55px] w-full bg-gradient-to-b from-transparent to-white'
          onClick={(e) => e.stopPropagation()}
        ></div>
      </ul>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className='space-y-2'>
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className='mb-1 h-5 animate-pulse bg-slate-100'></div>
      ))}
    </div>
  );
}
