'use client';
import { Campaign } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CampaignCard } from './CampaignCard';
interface Meta {
  limit: number;
  page: number;
  totalCampaigns: number;
  totalPages: number;
}

const CampaignsCarousel = ({
  campaigns,
  tag,
  isLoadingMore,
  // size,
  setSize,
}: {
  campaigns: Campaign[];
  tag: string;
  isLoadingMore: boolean;
  // size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<
    | {
        campaigns: Campaign[];
        meta: Meta;
      }[]
    | undefined
  >;
}) => {
  return (
    <div className='w-full space-y-14 md:pl-6'>
      <div className='space-y-5'>
        <h2 className='text-center text-2xl font-extralight text-primary-dark md:text-left md:text-3xl'>
          {tag}
        </h2>
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          lazyPreloadPrevNext={5}
          draggable={true}
          navigation
          autoplay={{
            delay: 10000,
            // disableOnInteraction: false,
          }}
          slidesPerView='auto'
          spaceBetween='40px'
          modules={[Pagination, Navigation, Autoplay]}
          onActiveIndexChange={(swiper) => {
            const shouldLoadMore =
              !isLoadingMore && swiper.activeIndex > swiper.slides.length - 4;
            if (shouldLoadMore) setSize((size) => size + 1);
          }}
        >
          {campaigns?.map((item) => {
            return (
              <SwiperSlide key={item.id} className='md:max-w-[400px]'>
                {' '}
                <CampaignCard campaign={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CampaignsCarousel;
