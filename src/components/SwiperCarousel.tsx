'use client';

import { REGEX_CODES } from '@/lib/constants';
import YouTubePlayer from 'react-player/youtube';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageWithFallback from './ImageWithFallback';

export const SwiperCarousel = ({ images }: { images: string[] }) => {
  // const AnimImage = motion(Image);

  return (
    <div className='container h-80 overflow-hidden rounded-lg bg-[#f6f8fc] sm:h-96 lg:h-[450px]'>
      <Swiper
        className='h-full'
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        loop
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        {images.map((mediaLink) => (
          <SwiperSlide key={mediaLink}>
            {REGEX_CODES.ytLink.test(mediaLink) ? (
              <>
                <YouTubePlayer url={mediaLink} width='100%' height='100%' />
              </>
            ) : (
              <ImageWithFallback
                className='h-full flex-shrink-0 object-contain'
                src={mediaLink || ''}
                width={800}
                height={800}
                alt={mediaLink}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
