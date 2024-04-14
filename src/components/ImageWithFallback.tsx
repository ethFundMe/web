'use client';

import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  fallback?: string;
} & ImageProps;

export default function ImageWithFallback({
  fallback = '/images/broken.jpg',
  alt,
  src,
  ...rest
}: Props) {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setError(false);
    setLoading(true);
  }, [src]);

  return (
    <Image
      className={cn(
        loading && 'animate-pulse bg-slate-200',
        error && 'grayscale'
      )}
      blurDataURL='/images/broken.jpg'
      placeholder='blur'
      src={error ? fallback : src}
      onLoad={() => setLoading(false)}
      onError={() => {
        setError(true);
        setLoading(false);
      }}
      alt={alt}
      {...rest}
    />
  );
}
