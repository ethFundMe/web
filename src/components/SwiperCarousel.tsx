'use client';

import YouTubePlayer from 'react-player/youtube';

import { REGEX_CODES } from '@/lib/constants';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageWithFallback from './ImageWithFallback';

export const SwiperCarousel = ({ images }: { images: string[] }) => {
  // const AnimImage = motion(Image);

  return (
    <div className='container h-full'>
      <Swiper
        className='h-full'
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        loop
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {images.map((mediaLink) => (
          <SwiperSlide key={mediaLink}>
            {REGEX_CODES.ytLink.test(mediaLink) ? (
              <>
                <YouTubePlayer url={mediaLink} width='100%' height='100%' />
              </>
            ) : (
              <ImageWithFallback
                className='w-full flex-shrink-0 object-cover'
                src={mediaLink}
                width={800}
                height={800}
                alt='...'
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// <>
//   <div className='relative overflow-hidden'>
//     <AnimatePresence initial={false}>
//       <motion.div
//         className='h-80 sm:h-96 lg:h-[450px]'
//         variants={CarouselVariants}
//         initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
//         animate='visible'
//         exit={direction === 'right' ? 'exitLeft' : 'exitRight'}
//         transition={{ type: 'spring', damping: 20 }}
//       >
//         {REGEX_CODES.ytLink.test(images[currentIndex]) ? (
//           <>
//             <YoutubePlayer
//               url={images[currentIndex]}
//               width='100%'
//               height='100%'
//             />
//           </>
//         ) : (
//           <ImageWithFallback
//             key={currentIndex}
//             className='w-full flex-shrink-0 object-cover'
//             src={images[currentIndex]}
//             width={800}
//             height={800}
//             alt='...'
//           />
//         )}
//       </motion.div>
//     </AnimatePresence>

//     <div className='pointer-events-none absolute left-0 right-0 top-0 flex h-full items-center justify-between text-white'>
//       <button
//         disabled={currentIndex === 0}
//         className='pointer-events-auto h-full bg-black bg-opacity-50 p-4 opacity-0 transition-all duration-150 ease-in hover:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-10'
//         onClick={handlePrevious}
//       >
//         <RxCaretLeft size={20} />
//       </button>
//       <button
//         disabled={images.length - 1 === currentIndex}
//         className='disabled:hover;opacity-10 pointer-events-auto h-full bg-black bg-opacity-50 p-4 opacity-0 transition-all duration-150 ease-in hover:opacity-50 disabled:cursor-not-allowed'
//         onClick={handleNext}
//       >
//         <RxCaretRight size={20} />
//       </button>
//     </div>
//   </div>

//   <div className='flex justify-center gap-4'>
//     {images.map((_, idx) => (
//       <motion.div
//         key={_}
//         animate={{
//           scale: [0, 1],
//           background: [
//             '#e2e8f0',
//             currentIndex === idx ? '#0062a6' : '#e2e8f0',
//           ],
//         }}
//         layout
//         className={cn(
//           'h-3 w-3 cursor-pointer rounded-full'
//           // currentIndex === idx ? 'bg-primary-default' : 'bg-slate-200'
//         )}
//         onClick={() => handleDotClick(idx)}
//       ></motion.div>
//     ))}
//   </div>
// </>
