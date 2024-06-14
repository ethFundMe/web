'use client';
import { Campaign } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CampaignCard } from './CampaignCard';

const CampaignsCarousel = ({
  campaigns,
  tag,
}: {
  campaigns: Campaign[];
  tag: string;
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
          draggable={true}
          navigation
          slidesPerView='auto'
          spaceBetween='40px'
          modules={[Pagination, Navigation]}
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
