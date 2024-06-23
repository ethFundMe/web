'use client';

import { getCampaigns } from '@/lib/queries';
import { Campaign } from '@/types';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SClass } from 'swiper/types';
import { CampaignCard } from './CampaignCard';
import { Button } from './ui/button';

const CampaignsCarousel = ({
  campaigns,
  tag,
  totalCampaigns,
}: {
  campaigns: Campaign[];
  tag: string;
  totalCampaigns: number;
}) => {
  const [page, setPage] = useState(1);
  const [campaignsShowing, setCampaignsShowing] = useState(campaigns);
  const [loadingMore, setLoadingMore] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);

  const swiperRef = useRef<SClass>();

  const loadMoreCampaigns = useCallback(
    async function () {
      setLoadingMore(true);

      if (loadingMore) return;
      if (typeof window === 'undefined') return;
      if (page === Math.ceil(totalCampaigns / 10)) return;

      const next = page + 1;

      const { campaigns: c } = await getCampaigns({
        page: next,
        tag,
      }).finally(() => setLoadingMore(false));

      if (c.length && !(campaigns.length === totalCampaigns)) {
        setPage(next);
        setCampaignsShowing((prev) => [...prev, ...c]);
      }
    },
    [page, campaigns, tag, totalCampaigns, loadingMore]
  );

  function handleDisableBtn(isBeginning: boolean, isEnd: boolean) {
    if (isBeginning) {
      setDisablePrev(true);
    } else if (isEnd) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
      setDisablePrev(false);
    }
  }

  return (
    <div className='w-full space-y-14 md:pl-6'>
      <div className='relative space-y-5'>
        <div className='flex items-center justify-between'>
          <h2 className='w-full text-center text-2xl font-extralight text-primary-dark md:text-left md:text-3xl'>
            {tag}
          </h2>

          {campaigns.length > 3 && (
            <div className='hidden gap-3 md:flex'>
              <Button
                disabled={disablePrev}
                variant='outline'
                onClick={() => swiperRef.current?.slidePrev()}
                className='p-2 disabled:pointer-events-auto'
              >
                <ArrowLeftIcon strokeWidth={1.2} />
              </Button>

              <Button
                disabled={disableNext}
                className='p-2 disabled:pointer-events-auto'
                variant='outline'
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ArrowRightIcon strokeWidth={1.2} />
              </Button>
            </div>
          )}
        </div>

        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onInit={(swiper) => {
            handleDisableBtn(swiper.isBeginning, swiper.isEnd);
          }}
          lazyPreloadPrevNext={5}
          draggable={true}
          autoplay={{
            delay: 10000,
          }}
          slidesPerView='auto'
          spaceBetween='40px'
          modules={[Pagination, Autoplay]}
          onActiveIndexChange={(swiper) => {
            handleDisableBtn(swiper.isBeginning, swiper.isEnd);

            // console.log(swiper.snapIndex, swiper.activeIndex, swiper.realIndex);

            const shouldLoadMore =
              swiper.activeIndex > swiper.slides.length - 5 &&
              campaignsShowing.length !== totalCampaigns;
            if (shouldLoadMore) {
              loadMoreCampaigns();
            }
          }}
        >
          {campaignsShowing.map((item) => {
            return (
              <SwiperSlide key={item.id} className='sm:max-w-[400px]'>
                <CampaignCard campaign={item} />
              </SwiperSlide>
            );
          })}

          {campaignsShowing.length < totalCampaigns ? (
            <SwiperSlide className='md:max-w-[400px]'>
              <div
                // ref={ref}
                className='space-y-4 border border-primary-gray p-4'
              >
                <div className='h-80 animate-pulse bg-slate-100 md:h-48 lg:h-60'></div>
                <div className='h-4 animate-pulse bg-slate-100'></div>
                <div className='h-2 animate-pulse bg-slate-100'></div>
                <div className='h-12 animate-pulse bg-slate-100'></div>
                <div className='h-[60px] animate-pulse bg-slate-100'></div>
              </div>
            </SwiperSlide>
          ) : (
            <div className='hidden h-4/5 items-center justify-center'>
              <p className='text-center text-slate-500'>- End of campaigns -</p>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default CampaignsCarousel;
