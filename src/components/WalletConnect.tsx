'use client';

import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function WalletConnect() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button onClick={() => setOpenModal(true)}>Connect Wallet</button>

      <div
        onClick={() => setOpenModal(false)}
        className={cn(
          'fixed inset-0 z-50 grid place-content-center bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8))] transition-all duration-150 ease-in',
          openModal ? 'scale-100' : 'scale-0'
        )}
      >
        <div className='w-96 rounded-md bg-white p-4 text-black'>
          <h2 className={cn(TextSizeStyles.h4, 'text-center')}>
            Connect Wallet
          </h2>

          <ul className='mt-4 space-y-2'>
            <li className='cursor-pointer p-2 hover:bg-slate-200'>Metamask</li>
            <li className='cursor-pointer p-2 hover:bg-slate-200'>Coinbase</li>
          </ul>
        </div>
      </div>
    </>
  );
}
