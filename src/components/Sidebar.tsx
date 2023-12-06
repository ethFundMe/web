import { NAVBARROUTES } from '@/lib/constants';
import { useModalStore } from '@/store/modalStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiXCircle } from 'react-icons/hi';
import { ConnectWallet } from './ConnectWallet';

export const Sidebar = () => {
  const { closeModal } = useModalStore();

  // useEffect(() => {
  //   const handleClose = (e: KeyboardEvent) => {
  //     if (e.code === 'Escape') {
  //       alert('close');
  //     }
  //   };

  //   document.addEventListener('keyup', handleClose);

  //   return () => document.removeEventListener('keyup', handleClose);
  // }, [closeModal]);

  return (
    <motion.div
      animate={{ right: ['-100%', '0%'] }}
      exit={{ right: '-100%' }}
      className='fixed right-0 top-0 h-screen w-full bg-white p-4 sm:w-96 sm:rounded-l-2xl'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='inner scrollbar-hidden flex h-full  flex-col justify-between overflow-auto'
      >
        <div
          className='ml-auto w-fit cursor-pointer justify-end text-2xl text-neutral-500 hover:text-red-300 sm:p-2'
          onClick={closeModal}
        >
          <HiXCircle />
        </div>

        <ul className='flex-1 space-y-2'>
          {NAVBARROUTES.map((route) => (
            <li key={route.link} onClick={closeModal}>
              <Link
                href={route.link}
                className='block rounded-md py-2 transition-all duration-100 ease-in hover:bg-neutral-200 hover:pl-2'
              >
                {route.title}
              </Link>
            </li>
          ))}
        </ul>

        <ConnectWallet variant='sidebar' />
      </div>
    </motion.div>
  );
};
