'use client';

import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';

export default function WalletConnect() {
  const { openModal } = useModalStore();

  return (
    <>
      <button onClick={() => openModal(<ModalContent />)}>
        Connect Wallet
      </button>
    </>
  );
}

const ModalContent = () => (
  <div className='w-full rounded-md bg-white py-4 text-black sm:w-96 sm:max-w-md'>
    <h2 className={cn(TextSizeStyles.h4, 'text-center')}>Connect Wallet</h2>

    <ul className='mt-4 space-y-2'>
      {[
        { icon: '/images/MetaMask_Fox.svg.webp', title: 'Meta Mask' },
        { icon: '/images/coinbase-logo.webp', title: 'Coinbase Wallet' },
        { icon: '/images/wallet-connect-logo.png', title: 'Wallet Connect' },
      ].map((item) => (
        <WalletOption {...item} key={item.title} />
      ))}
    </ul>
  </div>
);

const WalletOption = ({ icon, title }: { icon: string; title: string }) => (
  <div className='flex items-center gap-2 rounded-md p-2 hover:bg-slate-200'>
    <div className='grid h-12 w-12 place-content-center rounded-full bg-white'>
      <Image
        src={icon}
        className='h-8 w-8 object-cover'
        width={50}
        height={50}
        alt='...'
      />
    </div>

    <p className='text-lg font-semibold'>{title}</p>
  </div>
);
