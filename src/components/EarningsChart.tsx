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

type Earning = {
  amount: number;
  dateEarned: Date;
  source: string;
};

type Props = {
  earnings: Earning[];
};

export const EarningsChart = ({ earnings }: Props) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart
        className='w-full'
        // width={600}
        height={300}
        data={earnings}
        // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {/* <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#0062a6' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#0062a6' stopOpacity={0} />
          </linearGradient>
        </defs> */}
        <XAxis dataKey='source' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='amount'
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
