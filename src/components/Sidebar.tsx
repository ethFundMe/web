import { NAVBARROUTES } from '@/lib/constants';
import { NavbarRoute } from '@/lib/types';
import { useModalStore } from '@/store/modalStore';
import { motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { AuthSidebarRoute } from './AuthSidebarRoute';
import { NavLink } from './NavLink';
import { SidebarUserCard } from './SidebarUserCard';

export const Sidebar = () => {
  const { closeModal } = useModalStore();

  return (
    <motion.div
      animate={{ right: ['-100%', '0%'] }}
      exit={{ right: '-100%' }}
      className='fixed right-0 top-0 h-screen w-full bg-white p-4 sm:w-[400px] sm:rounded-l-2xl'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='inner scrollbar-hidden relative flex h-full flex-col justify-between gap-10 overflow-auto'
      >
        <div
          className='absolute right-0 top-0 w-fit cursor-pointer p-2 text-2xl text-white hover:text-red-400'
          onClick={closeModal}
        >
          <HiX />
        </div>

        <SidebarUserCard />

        <ul className='flex-1 space-y-2'>
          <AuthSidebarRoute />
          {NAVBARROUTES.map((route) => (
            <SidebarNavLink key={route.title} {...route} />
          ))}
        </ul>

        {/* <ConnectWallet variant='sidebar' /> */}

        <p className='text-center text-sm text-slate-400'>EthFundMe</p>
      </div>
    </motion.div>
  );
};

export const SidebarNavLink = ({ title, link, icon }: NavbarRoute) => {
  const { closeModal } = useModalStore();

  return (
    <li onClick={closeModal}>
      <NavLink
        href={link}
        activeStyles={({ isActive }) =>
          isActive
            ? 'bg-primary-default text-white hover:bg-primary-default pl-4 font-semibold'
            : 'hover:font-normal'
        }
        className='flex items-center gap-4 rounded-md py-2 pl-4 transition-all duration-100 ease-in hover:bg-slate-200'
      >
        {icon}

        {title}
      </NavLink>
    </li>
  );
};
