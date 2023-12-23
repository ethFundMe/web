'use client';

import { useModalStore } from '@/store/modal';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import { Container } from './Container';

export default function ModalProvider() {
  const { content, closeModal, options } = useModalStore();

  useEffect(() => {
    const body = document.querySelector('body');
    const bodyExists = !!body;

    if (bodyExists) {
      body.style.overflowY = content ? 'hidden' : 'auto';
    }
  }, [content]);

  const variants: Variants = {
    animate: {
      opacity: [0, 1],
      transition: { type: 'spring', damping: 13 },
    },
    exit: { opacity: 0, transition: { when: 'afterChildren' } },
  };

  const innerVariants: Variants = {
    animate: {
      scale: [0.5, 1],
      opacity: [0, 1],
      transition: { type: 'spring', damping: 13 },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
    },
  };

  return (
    <AnimatePresence>
      {content && (
        <motion.div
          variants={variants}
          animate='animate'
          exit='exit'
          className='scrollbar-hidden fixed inset-0 z-40 h-screen overflow-auto bg-black bg-opacity-75'
          onClick={closeModal}
        >
          <Container className='flex h-full items-center justify-center'>
            {options && options.hideContent ? (
              content
            ) : (
              <motion.div
                variants={innerVariants}
                className='min-w-md relative h-fit w-fit rounded-lg bg-white p-4'
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className='absolute right-2 top-2 cursor-pointer text-2xl text-neutral-700 hover:scale-105 hover:text-red-500'
                >
                  <HiX />
                </button>

                {content}
              </motion.div>
            )}
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
