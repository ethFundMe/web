'use client';

import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AiFillCopy, AiOutlineCopy } from 'react-icons/ai';

export default function ShareCampaignLink({ link }: { link: string }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setLinkCopied(true);

    setTimeout(() => setLinkCopied(false), 1000);
  };

  return (
    <div>
      <h2 className={TextSizeStyles.h4}>Share link</h2>

      <div
        className='relative mt-4 flex h-10 cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-md bg-neutral-200 p-3'
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
            linkCopied ? 'text-green-600' : 'text-primary'
          )}
        >
          {linkCopied ? <AiFillCopy /> : <AiOutlineCopy />}
        </button>
      </div>
    </div>
  );
}
