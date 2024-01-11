'use client';

import { useState } from 'react';
import CUp from 'react-countup';
import { InView } from 'react-intersection-observer';

export default function CountUp({
  end = 200,
  duration = 5,
}: {
  end: number;
  duration: number;
}) {
  const [result, setResult] = useState(0);

  return (
    <InView
      as='span'
      // rootMargin='30px'
      onChange={(inView) => {
        if (inView) {
          setResult(end);
        }
      }}
    >
      <CUp end={result} duration={duration} />
    </InView>
  );
}
