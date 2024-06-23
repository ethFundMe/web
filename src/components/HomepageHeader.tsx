/* eslint-disable @next/next/no-img-element */
'use client';

import { userStore } from '@/store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import Typewriter from 'typewriter-effect';
import { useAccount } from 'wagmi';
import { Container } from './Container';
import { Button } from './ui/button';

const getRandomHeroText = (texts: string[]) => {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
};

export const HomepageHeader = () => {
  const heroTexts = [
    'Empower communities and bring dreams to life using blockchain technology.',
    'Make a difference with every contribution, powered by the transparency of blockchain',
    'Join the movement and support groundbreaking projects with secure blockchain donations.',
    'Transform lives and support innovative causes with blockchain-powered crowdfunding.',
  ];
  const { user } = userStore();
  const { isConnected } = useAccount();
  const time = new Date().getHours();
  const [greeting, setGreeting] = useState('');
  const [heroText, setHeroText] = useState('');

  useEffect(() => {
    // Set a random hero text on component mount
    const randomText = getRandomHeroText(heroTexts);
    setHeroText(randomText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getGreeting = (time: number) => {
    if (time >= 0 && time < 12) {
      return setGreeting('Good Morning,');
    }
    if (time >= 12 && time < 16) {
      return setGreeting('Good Afternoon,');
    }
    return setGreeting('Good Evening,');
  };

  const splitName = (name: string) => {
    const splittedName = name.split(' ');
    return splittedName[0];
  };

  const getGreeterHeader = () => {
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

  return (
    <div className='relative overflow-hidden'>
      <header className='relative bg-white text-[#042D42]'>
        {/* <div className='absolute left-0 top-0 z-0 h-full w-full bg-[linear-gradient(rgba(255,255,255,0)_75%,rgba(255,255,255,1)_99%),url(/images/grid.png)] bg-cover bg-center bg-no-repeat'></div> */}

        <Container className='relative z-10 flex h-[calc(100dvh-4rem)] max-h-[910px] items-center justify-center'>
          <div className='flex flex-col gap-[30px] text-center md:gap-[40px]'>
            <div className='space-y-4 md:space-y-5'>
              {!user || !isConnected ? (
                <h1 className='text-5xl font-medium leading-tight lg:text-9xl'>
                  This is EthFundMe!
                </h1>
              ) : (
                <motion.h1
                  animate={{
                    opacity: [0, 1],
                    scale: [1.2, 1],
                    transition: { duration: 0.25, ease: 'easeInOut' },
                  }}
                  key={greeting}
                  className='mx-auto flex max-w-max items-center gap-x-2 text-ellipsis whitespace-nowrap text-3xl font-medium leading-tight md:gap-x-5 md:text-7xl'
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

              <p className='mx-auto max-w-xs text-center text-lg text-black sm:max-w-lg sm:text-xl md:max-w-3xl md:text-3xl'>
                {heroText}
              </p>
            </div>

            <div className='mx-auto flex max-w-[200px] flex-col items-stretch justify-center gap-4 sm:max-w-fit sm:flex-row sm:items-center'>
              <Button asChild size='lg' className='text-md'>
                <Link
                  href='/campaigns'
                  className='group relative flex min-w-[150px] items-center justify-center gap-1 overflow-hidden hover:bg-opacity-100'
                >
                  <span className='transition-all duration-200 ease-in sm:group-hover:-translate-x-3'>
                    Explore
                  </span>
                  <span className='-right-8 top-1/2 text-white transition-all duration-200 ease-in group-hover:right-7 group-hover:opacity-100 sm:absolute sm:-translate-y-1/2'>
                    <Image
                      src='/images/explore-icon.png'
                      width={20}
                      height={20}
                      alt='...'
                      className='invert'
                    />
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
    </div>
  );
};
