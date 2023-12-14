'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AiFillCopy, AiOutlineCopy } from 'react-icons/ai';

export const ShareCampaignLinkBox = ({ link }: { link: string }) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setLinkCopied(true);

    setTimeout(() => setLinkCopied(false), 1000);
  };

  return (
    <div
      className='relative flex h-10 cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-md bg-neutral-200 p-3'
      onClick={handleCopy}
    >
      <motion.p animate={{ y: linkCopied ? 0 : -50 }} className='absolute'>
        Copied!
      </motion.p>

      <motion.p
        animate={{ y: linkCopied ? 50 : 0, opacity: linkCopied ? 0 : 1 }}
        className=''
      >
        {link}
      </motion.p>

      <button
        className={cn(
          'flex-shrink-0 rotate-180 text-lg',
          linkCopied ? 'text-green-600' : 'text-primary-default'
        )}
      >
        {linkCopied ? <AiFillCopy /> : <AiOutlineCopy />}
      </button>
    </div>
  );
};
