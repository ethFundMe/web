'use client';

import { useEffectOnce } from '@/lib/hook/useEffectOnce';
// import { useEffect } from 'react';

export const ReportView = ({ slug }: { slug: string }) => {
  useEffectOnce(() => {
    // console.log('Triggered only once, on mount', { data })
    console.log('Sending POST request with slug:', slug);
    fetch('/api/incr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    });
  });
  // useEffect(() => {
  // }, [slug]);

  return null;
};
