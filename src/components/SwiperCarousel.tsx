'use client';

import { REGEX_CODES } from '@/lib/constants';
import { PauseIcon, PlayIcon } from '@livepeer/react/assets';
import { getSrc, LivepeerPlaybackInfo } from '@livepeer/react/external';
import {
  Container,
  Controls,
  ErrorIndicator,
  LoadingIndicator,
  PlayingIndicator,
  PlayPauseTrigger,
  Root,
  Video,
} from '@livepeer/react/player';
import YouTubePlayer from 'react-player/youtube';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageWithFallback from './ImageWithFallback';

export const SwiperCarousel = ({
  images,
  playbackInfo,
}: {
  images: string[];
  playbackInfo: LivepeerPlaybackInfo | undefined;
}) => {
  // const AnimImage = motion(Image);

  return (
    <div className='container h-80 overflow-hidden rounded-lg bg-[#f6f8fc] sm:h-96 lg:h-[450px]'>
      <Swiper
        className='h-full'
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        loop
        slidesPerView={1}
        navigation={images.length <= 1 ? false : true}
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
            ) : REGEX_CODES.livepeerId.test(mediaLink) ? (
              <LivepeerPlayer info={playbackInfo} />
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

function LivepeerPlayer({ info }: { info: LivepeerPlaybackInfo | undefined }) {
  const src = getSrc(info);
  return (
    <Root src={src} autoPlay>
      <Container className='h-full w-full overflow-hidden bg-gray-950'>
        <Video title='Live stream' className='h-full w-full' />
        <LoadingIndicator
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
          }}
        >
          Loading...
        </LoadingIndicator>
        <ErrorIndicator
          matcher='all'
          style={{
            position: 'absolute',
            inset: 0,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
          }}
        >
          An error occurred.
        </ErrorIndicator>
        <Controls className='flex items-center justify-center'>
          <PlayPauseTrigger className='h-10 w-10 flex-shrink-0 hover:scale-105'>
            <PlayingIndicator asChild matcher={false}>
              <PlayIcon className='h-full w-full text-white' />
            </PlayingIndicator>
            <PlayingIndicator asChild>
              <PauseIcon className='h-full w-full text-white' />
            </PlayingIndicator>
          </PlayPauseTrigger>
        </Controls>
      </Container>
    </Root>
  );
}
