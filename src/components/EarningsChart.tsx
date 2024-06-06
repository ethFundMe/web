'use client';

import dayjs from 'dayjs';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
  ZAxis,
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
    <div>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart
          className='w-full'
          // width={600}
          height={300}
          data={earnings}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          {/* <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#0062a6' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#0062a6' stopOpacity={0} />
          </linearGradient>
        </defs> */}
          <ZAxis dataKey='source' />
          <XAxis
            dataKey='dateEarned'
            reversed
            // tickFormatter={(label: string) => {
            //   const date = dayjs(label).toDate().toLocaleDateString();
            //   return date ?? '';
            // }}
            tickFormatter={(label: string) => {
              const date = dayjs(label).toDate().toLocaleDateString();
              const thisYear = new Date().getFullYear().toString();
              const newDate = date.replace(thisYear, thisYear.slice(2));
              return newDate ?? '';
            }}
          />
          <YAxis dataKey='amount' />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip content={<CustomLabel />} />
          <Area
            type='monotone'
            dataKey='amount'
            fillOpacity={1}
            stroke='#2563eb'
            // fill='url(#colorUv)'
            fill='#93c5fd50'
          />

          {/* <span className='capitalize'>
            <Legend />
          </span> */}

          {/* <Area
          type='monotone'
          dataKey='y'
          stroke='#82ca9d'
          fillOpacity={1}
          fill='url(#colorPv)'
        /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

function CustomLabel({ payload }: TooltipProps<number, string>) {
  // const date = new Date(label).toLocaleDateString();

  return (
    <div className='bg-white p-1.5'>
      <p>{payload?.map((i) => `${i.payload.source}`)}</p>
      <p>{payload?.map((i) => `${i.value} FUNDME`)}</p>
      {/* <p>{date}</p> */}
    </div>
  );
}
