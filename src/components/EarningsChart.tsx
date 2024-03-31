'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const EarningsChart = () => {
  const data = [
    { name: 'A', x: 2, y: 23, z: 122 },
    { name: 'B', x: 1, y: 3, z: 73 },
    { name: 'C', x: 2, y: 15, z: 32 },
    { name: 'D', x: 5, y: 35, z: 23 },
    { name: 'E', x: 1, y: 45, z: 20 },
    { name: 'F', x: 6, y: 25, z: 29 },
    { name: 'G', x: 9, y: 17, z: 61 },
    { name: 'H', x: 0, y: 32, z: 45 },
    { name: 'I', x: 19, y: 43, z: 93 },
    { name: 'J', x: 1, y: 43, z: 93 },
    { name: 'K', x: 7, y: 43, z: 93 },
    { name: 'L', x: 1, y: 43, z: 93 },
    { name: 'M', x: 90, y: 43, z: 93 },
    { name: 'N', x: 8, y: 43, z: 93 },
  ];
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart
        className='w-full'
        // width={600}
        height={300}
        data={data}
        // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {/* <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#0062a6' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#0062a6' stopOpacity={0} />
            </linearGradient>
          </defs> */}
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='x'
          fillOpacity={1}
          stroke='#2563eb'
          // fill='url(#colorUv)'
          fill='#93c5fd50'
        />
        {/* <Area
          type='monotone'
          dataKey='y'
          stroke='#82ca9d'
          fillOpacity={1}
          fill='url(#colorPv)'
        /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};
