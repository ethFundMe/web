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
  const [decimal, setDecimal] = useState<null | number>(null);

  const isDecimal = /[.]/.test(String(end));

  return (
    <InView
      as='span'
      onChange={(inView) => {
        if (inView) {
          setResult(end);
          if (isDecimal) {
            setResult(0);
            setTimeout(() => setDecimal(end), duration * 200);
          } else {
            setResult(end);
          }
        }
      }}
    >
      {isDecimal && decimal}
      {isDecimal && !decimal && <CUp end={result} duration={duration} />}
      {!isDecimal && <CUp end={result} duration={duration} />}
    </InView>
  );
}
