'use client';

import { useCountdown } from '@/lib/hook/useCountdown';
import { AnimatePresence, motion } from 'framer-motion';

export const ValidatorCountdown = () => {
  const [days, hours, minutes, seconds] = useCountdown(
    new Date('2024-04-20T11:25:06.296Z')
  );

  const Obj = { days, hours, minutes, seconds };

  return days + hours + minutes + seconds <= 0 ? (
    'Expired'
  ) : (
    <div className='flex gap-4'>
      <AnimatePresence mode='popLayout' initial={false}>
        {Object.entries(Obj).map(([key, value]) => (
          <div key={key}>
            <div className='flex flex-col items-center font-bold uppercase'>
              <motion.p
                key={value}
                animate={{
                  // y: [-10, 0],
                  // opacity: [0, 1],
                  scale: [0.9, 1],
                  transition: {
                    type: 'spring',
                    damping: 30,
                  },
                }}
                // exit={{ opacity: 0, y: -100 }}
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
  );
};
