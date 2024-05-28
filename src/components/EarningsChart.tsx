'use client';

import { ShortLabels } from '@/lib/constants';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
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
    <div>
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
          <XAxis
            dataKey='source'
            tickFormatter={(label: string) => `${ShortLabels[label]}`}
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

          <span className='capitalize'>
            <Legend />
          </span>

          {/* <Area
          type='monotone'
          dataKey='y'
          stroke='#82ca9d'
          fillOpacity={1}
          fill='url(#colorPv)'
        /> */}
        </AreaChart>
      </ResponsiveContainer>

      <div className='mt-5'>
        <p className='mb-2 font-bold text-primary-default'>Legend</p>
        <ul className='text-sm'>
          <li>
            <span className='inline-block w-10 font-bold'>CC:</span>
            Created campaign
          </li>
          <li>
            <span className='inline-block w-10 font-bold'>FC:</span>
            Funded campaign
          </li>
        </ul>
      </div>
    </div>
  );
};

function CustomLabel({ label, payload }: TooltipProps<number, string>) {
  return (
    <div className='bg-white p-1.5'>
      {/* <p>{ShortLabels[label]}</p> */}
      <p>{label}</p>
      <p>{payload?.map((i) => `${i.value} FUNDME`)}</p>
    </div>
  );
}
