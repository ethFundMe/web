'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { CampaignCard } from './CampaignCard';

const fetcher = (url: string) => fetch(url).then((r) => r.json());
interface Meta {
  limit: number;
  page: number;
  totalCampaigns: number;
  totalPages: number;
}

const CampaignsCarousel = ({ tag }: { tag: string }) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT || '';
  const { data, isLoading } = useSWR<{ campaigns: Camapaign[]; meta: Meta }>(
    `${apiBaseUrl}/api/campaigns?tag=${tag}`,
    fetcher
  );
  if (isLoading) return <div>loading...</div>;

  const { campaigns } = data;
  console.log(campaigns);
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
