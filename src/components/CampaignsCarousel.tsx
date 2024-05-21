'use client';
import { Campaign } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { deviceType, isMobile } from 'react-device-detect';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CampaignCard } from './CampaignCard';

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

const CampaignsCarousel = ({ campaigns }: { campaigns: Campaign[] }) => {
  const uniqueTags: string[] = Array.from(
    new Set(campaigns.map((obj) => obj.tag))
  );

  return (
    <div>
      <div className='w-full space-y-14 md:pl-6'>
        {uniqueTags.map((tag) => (
          <div key={tag} className='space-y-5'>
            <h2 className='text-center text-2xl font-extralight text-primary-dark md:text-left md:text-3xl'>
              {tag}
            </h2>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={isMobile ? true : false}
              // renderDotsOutside={true}
              responsive={responsive}
              // centerMode={isMobile ? true : false}
              // renderArrowsWhenDisabled={isMobile ? true : false}
              //   ssr={true} // means to render carousel on server-side.
              infinite={isMobile ? true : false}
              autoPlay={isMobile ? true : false}
              autoPlaySpeed={5000}
              keyBoardControl={true}
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
            >
              {campaigns
                .filter((i) => i.tag === tag)
                .map((item) => {
                  return <CampaignCard key={item.id} campaign={item} />;
                })}
            </Carousel>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignsCarousel;
