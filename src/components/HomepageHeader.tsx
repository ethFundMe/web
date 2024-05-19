/* eslint-disable @next/next/no-img-element */
'use client';

import { userStore } from '@/store';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
// import './App.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { FaEthereum } from 'react-icons/fa';
import { Container } from './Container';
import { Button } from './ui/button';

export const HomepageHeader = () => {
  const { user } = userStore();
  const time = new Date().getHours();
  const [greeting, setGreeting] = useState('');
  const getGreeting = (time: number) => {
    if (time >= 0 && time < 12) {
      return setGreeting('Good Morning,');
    }
    if (time >= 12 && time < 16) {
      return setGreeting('Good Afternoon, ');
    }
    return setGreeting('Good Evening, ');
  };

  const splitName = (name: string) => {
    const splittedName = name.split(' ');
    return splittedName[0];
  };

  const getGreeterHeader = () => {
    // const _ = splitName(fullName).slice(0, 20);
    // const name =
    //   splitName(fullName).length > 20 ? _ + '...' : splitName(fullName);
    const greetArr = ['Welcome, ', 'Hello 👋 ', `${greeting} `];
    const randomNum = Math.round(Math.random() * 10);

    if (randomNum >= 0 && randomNum < 4) {
      return greetArr[0];
    }
    if (randomNum >= 4 && randomNum < 7) {
      return greetArr[1];
    }
    if (randomNum >= 7 && randomNum < 10) {
      return greetArr[2];
    }
  };

  const truncName = (fullname: string) => {
    const _ = splitName(fullname).slice(0, 20);
    const name =
      splitName(fullname).length > 20 ? _ + '...' : splitName(fullname);

    return name;
  };

  useEffect(() => {
    getGreeting(time);
  }, [time]);

  const images = useMemo(
    () => [
      '/videos/header-video.mp4',
      '/images/header/h1.webp',
      '/images/header/h2.webp',
      '/images/header/h3.webp',
      '/images/header/h4.webp',
      '/images/header/h5.webp',
    ],
    []
  );

  // const currentHour = new Date();
  const currentHour = new Date().getHours();
  const imageIndex = currentHour % images.length;
  const [currentImage, setCurrentImage] = useState(images[imageIndex]);
  useEffect(() => {
    setCurrentImage(images[imageIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageIndex]);

  // Update image every hour
  useEffect(() => {
    const interval = setInterval(
      () => {
        const newHour = new Date().getHours();
        setCurrentImage(images[newHour % images.length]);
      },
      1000 * 60 * 60
    ); // Change image every hour (1000ms * 60s * 60min)

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className='relative overflow-hidden'>
      <header className='relative overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7),rgba(0,0,0,0.5))] bg-cover bg-bottom bg-no-repeat text-white'>
        <div className='absolute top-0 -z-10 h-full w-full'>
          {imageIndex === 0 ? (
            <video
              src='/videos/header-video.mp4'
              muted
              loop
              autoPlay
              className='absolute h-full w-full bg-slate-900 object-cover'
            />
          ) : (
            <Image
              src={currentImage}
              alt='bg-image'
              fill
              priority
              className='absolute h-full w-full bg-slate-900 object-cover'
            />
          )}
        </div>
        <Container className='flex h-[calc(100dvh-4rem)] max-h-[910px]  items-center justify-center'>
          <div className='flex flex-col gap-[30px] text-center md:gap-[40px]'>
            <div className='space-y-4 md:space-y-5'>
              {!user ? (
                <h1 className='text-5xl font-medium leading-tight md:text-7xl'>
                  Welcome to EthFundMe!
                </h1>
              ) : (
                <motion.h1
                  animate={{
                    opacity: [0, 1],
                    scale: [1.2, 1],
                    transition: { duration: 0.25, ease: 'easeInOut' },
                  }}
                  key={greeting}
                  className='flex gap-x-2 text-ellipsis whitespace-nowrap text-3xl font-medium leading-tight md:gap-x-8 md:text-7xl'
                >
                  {getGreeterHeader()}
                  <Typewriter
                    options={{
                      cursorClassName: 'hidden',
                    }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(
                          isMobileOnly && truncName(user.fullName).length > 8
                            ? truncName(user.fullName).slice(0, 8).concat('...')
                            : truncName(user.fullName)
                        )
                        .start();
                    }}
                  />
                </motion.h1>
              )}

              <p className='mx-auto max-w-xs text-center text-lg text-white/80 sm:max-w-lg sm:text-xl md:max-w-3xl md:text-3xl'>
                Support projects and causes you care about with the power of
                blockchain.
              </p>
            </div>

            <div className='mx-auto flex max-w-[200px] flex-col items-stretch justify-center gap-4 sm:max-w-fit sm:flex-row sm:items-center'>
              <Button asChild size='lg' className='text-md'>
                <Link
                  href='/campaigns'
                  className='group relative flex min-w-[150px] items-center justify-center gap-1 overflow-hidden hover:bg-opacity-100'
                >
                  <span className='transition-all duration-200 ease-in sm:group-hover:-translate-x-3'>
                    Donate now
                  </span>
                  <span className='-right-8 top-1/2 transition-all duration-200 ease-in group-hover:right-3 group-hover:opacity-100 sm:absolute sm:-translate-y-1/2'>
                    <FaEthereum />
                  </span>
                </Link>
              </Button>

              <Button asChild variant='secondary' size='lg' className='text-md'>
                <Link href='/campaigns/create'>Create Campaign</Link>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <div className='absolute -bottom-0.5 z-10 h-16 w-full md:h-32'>
        <svg
          className='h-full w-full rotate-180'
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
            className='fill-white'
          ></path>
        </svg>
      </div>
      {/* <div className="ocean absolute bottom-0 z-10">
        <div className="wave"></div>
        <svg className="wave" xmlns="http://www.w3.org/2000/svg" width="1600" height="198">
          <path fill="#fff" fill-rule="evenodd" d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z" transform="matrix(-1 0 0 1 1600 0)" />
        </svg>
        <div class="wave"></div>
      </div> */}
    </div>
  );
};
