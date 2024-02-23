'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { SidebarNavLink } from './Sidebar';

export default function DashboardMobileMenu({
  routes,
}: {
  routes: { link: string; title: string; icon: React.ReactNode }[];
}) {
  const [unfold, setUnfold] = useState(false);

  useEffect(() => {
    const handleClose = (e: KeyboardEvent | MouseEvent) => {
      if ('key' in e && e.code === 'Escape') {
        setUnfold(false);
        return;
      }
      if (
        'type' in e &&
        e.type === 'click' &&
        e.target instanceof HTMLElement
      ) {
        if (!e.target) return;
        const contains = (e.target as HTMLElement).classList.contains(
          'mobile-menu'
        );

        if (!contains) setUnfold(false);
      }
    };

    document.addEventListener('click', handleClose);
    document.addEventListener('keyup', handleClose);

    return () => {
      document.removeEventListener('keyup', handleClose);
      document.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <div className='mobile-menu fixed bottom-16 right-0 z-20 md:hidden'>
      <AnimatePresence mode='wait'>
        <motion.div
          animate={{
            height: 'auto',
            // minHeight: unfold ? '6rem' : '2.5rem',
            // minWidth: unfold ? '6rem' : '2.5rem',
            backgroundColor: unfold ? '#0062a6' : '#0062a600',
            borderRadius: unfold ? ['0rem', '1rem'] : '100%',
            padding: '1rem',
            borderColor: unfold ? 'white' : 'transparent',
            marginRight: unfold ? '1rem' : 0,
          }}
          className='origin-bottom-right border p-4 text-white'
        >
          {unfold && (
            <motion.ul
              className='mb-4 flex origin-bottom-right flex-col gap-2'
              animate={{
                scale: ['0%', '100%'],
                transition: { type: 'spring', damping: 15 },
              }}
              exit={{ scale: 0 }}
            >
              {routes.map((route, idx) => (
                <span key={idx} onClick={() => setUnfold(false)}>
                  <SidebarNavLink
                    {...route}
                    activeStyles='bg-white pl-2 font-semibold'
                    className='gap-x-2 px-2 hover:text-primary-default'
                  />
                </span>
              ))}
            </motion.ul>
          )}

          <motion.div
            className={cn(
              'grid cursor-pointer place-content-end rounded-full bg-primary-default',
              !unfold && 'h-10 w-10 place-content-center'
            )}
            onClick={() => setUnfold((prev) => !prev)}
          >
            {unfold ? <X size={20} /> : <FaBars size={20} />}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
