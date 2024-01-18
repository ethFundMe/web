'use client';

import { CarouselVariants } from '@/lib/animationVariants';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ImageWithFallback from './ImageWithFallback';

export const Carousel = ({ images }: { images: string[] }) => {
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [currentIndex, setCurrentIndex] = useState(0);

  // const AnimImage = motion(Image);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
    setDirection('right');
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
    setDirection('left');
  };
  const handleDotClick = (index: number) => {
    if (currentIndex > index && currentIndex !== images.length - 1) {
      setDirection('right');
    } else {
      setDirection('left');
    }
    setCurrentIndex(index);
  };

  return (
    <>
      <div className='relative overflow-hidden'>
        <AnimatePresence initial={false}>
          <motion.div
            variants={CarouselVariants}
            initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
            animate='visible'
            exit={direction === 'right' ? 'exitLeft' : 'exitRight'}
            transition={{ type: 'spring', damping: 20 }}
          >
            <ImageWithFallback
              key={currentIndex}
              className='h-80 w-full flex-shrink-0 object-cover sm:h-96 lg:h-[450px]'
              src={images[currentIndex]}
              width={800}
              height={800}
              alt='...'
            />
          </motion.div>
        </AnimatePresence>

        <div className='absolute left-0 right-0 top-0 flex h-full items-center justify-between text-white'>
          <button
            disabled={currentIndex === 0}
            className='h-full bg-black bg-opacity-50 p-4 opacity-0 transition-all duration-150 ease-in hover:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-10'
            onClick={handlePrevious}
          >
            <FaArrowLeft />
          </button>
          <button
            disabled={images.length - 1 === currentIndex}
            className='disabled:hover;opacity-10 h-full bg-black bg-opacity-50 p-4 opacity-0 transition-all duration-150 ease-in hover:opacity-50 disabled:cursor-not-allowed'
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className='flex justify-center gap-4'>
        {images.map((_, idx) => (
          <div
            key={_}
            className={cn(
              'h-3 w-3 cursor-pointer rounded-full',
              currentIndex === idx ? 'bg-primary-default' : 'bg-slate-200'
            )}
            onClick={() => handleDotClick(idx)}
          ></div>
        ))}
      </div>
    </>
  );
};
