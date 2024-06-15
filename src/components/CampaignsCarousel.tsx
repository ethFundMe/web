'use client';

import { getCampaigns } from '@/lib/queries';
import { Campaign } from '@/types';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { deviceType, isMobile } from 'react-device-detect';
import { useInView } from 'react-intersection-observer';
import Carousel, { ButtonGroupProps } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CampaignCard } from './CampaignCard';
import { Button } from './ui/button';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
    // slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    // slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
    // slidesToSlide: 1, // optional, default to 1.
  },
};

const CampaignsCarousel = ({
  campaigns,
  totalCampaigns,
  tag,
}: {
  campaigns: Campaign[];
  tag: string;
  totalCampaigns: number;
}) => {
  const [page, setPage] = useState(1);
  const [campaignsShowing, setCampaignsShowing] = useState(campaigns);
  const [ref, inView] = useInView({ rootMargin: '50px' });

  const loadMoreCampaigns = useCallback(
    async function () {
      const next = page + 1;

      if (typeof window === 'undefined') return;

      const { campaigns: c } = await getCampaigns({
        page: next,
        tag,
      });

      if (c.length && !(campaigns.length === totalCampaigns)) {
        setPage(next);
        setCampaignsShowing((prev) => [...prev, ...c]);
      }
    },
    [page, campaigns, tag, totalCampaigns]
  );

  useEffect(() => {
    if (inView) {
      loadMoreCampaigns();
    }
  }, [inView, loadMoreCampaigns]);

  return (
    <div className='w-full space-y-14 md:pl-6'>
      <div className='relative space-y-5'>
        <h2 className='text-left text-2xl font-extralight text-primary-dark md:text-3xl'>
          {tag}
        </h2>
        <Carousel
          swipeable
          draggable
          renderButtonGroupOutside
          customButtonGroup={<ButtonGroup />}
          showDots={isMobile ? true : false}
          // renderDotsOutside={true}
          responsive={responsive}
          // centerMode={isMobile ? true : false}
          // renderArrowsWhenDisabled={isMobile ? true : false}
          //   ssr={true} // means to render carousel on server-side.
          infinite={isMobile ? true : false}
          autoPlay={isMobile ? true : false}
          autoPlaySpeed={10000}
          keyBoardControl
          customTransition='all 750ms'
          // transitionDuration={3500}
          containerClass='carousel-container'
          customLeftArrow={
            <ChevronLeft
              size={75}
              strokeWidth={1}
              className='absolute -left-4 z-50 text-7xl text-primary-default'
            />
          }
          customRightArrow={
            <ChevronRight
              size={75}
              strokeWidth={1}
              className='absolute -right-6 z-50 text-7xl text-primary-default'
            />
          }
          removeArrowOnDeviceType={['tablet', 'mobile']}
          deviceType={deviceType}
          dotListClass='!-mb-1'
          itemClass='carouselItem'
          className='!relative'
        >
          {campaignsShowing.map((item) => {
            return <CampaignCard key={item.id} campaign={item} />;
          })}

          {campaignsShowing.length !== totalCampaigns ? (
            <div ref={ref} className='space-y-4 border border-primary-gray p-4'>
              <div className='h-80 animate-pulse bg-slate-100 md:h-48 lg:h-60'></div>
              <div className='h-4 animate-pulse bg-slate-100'></div>
              <div className='h-2 animate-pulse bg-slate-100'></div>
              <div className='h-12 animate-pulse bg-slate-100'></div>
              <div className='h-[60px] animate-pulse bg-slate-100'></div>
            </div>
          ) : (
            <div className='hidden h-4/5 items-center justify-center'>
              <p className='text-center text-slate-500'>- End of campaigns -</p>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

const ButtonGroup = ({ next, previous, carouselState }: ButtonGroupProps) => {
  const currentSlide = carouselState?.currentSlide || 0;
  const lastIndex = carouselState?.totalItems
    ? carouselState.totalItems - 2
    : 0;
  return (
    lastIndex !== 0 && (
      <div className='carousel-button-group absolute -top-7 right-6 flex gap-3'>
        <Button
          variant='outline'
          onClick={() => previous && previous()}
          disabled={currentSlide === 0}
          className='p-2 disabled:pointer-events-auto'
        >
          <ArrowLeftIcon strokeWidth={1.2} />
        </Button>

        <Button
          className='p-2 disabled:pointer-events-auto'
          variant='outline'
          onClick={() => next && next()}
          disabled={currentSlide === lastIndex}
        >
          <ArrowRightIcon strokeWidth={1.2} />
        </Button>
      </div>
    )
  );
};

export default CampaignsCarousel;
