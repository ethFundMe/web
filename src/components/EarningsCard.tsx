import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

dayjs.extend(advancedFormat);

export default function EarningsCard() {
  type EarningVariant = 'claim' | 'create campaign';
  const earnings: {
    amt: number;
    type: EarningVariant;
    date: Date;
  }[] = [
    {
      amt: 10.5,
      type: 'create campaign',
      date: dayjs().toDate(),
    },
    {
      amt: 20,
      type: 'claim',
      date: dayjs().subtract(1, 'days').toDate(),
    },
    {
      amt: 100,
      type: 'claim',
      date: dayjs().subtract(2, 'days').toDate(),
    },
    {
      amt: 205,
      type: 'create campaign',
      date: dayjs().subtract(3, 'days').toDate(),
    },
  ];

  return (
    <div className='w-full max-w-md rounded-lg bg-primary-default p-4 text-white'>
      <h2 className='font-bold'>Earnings</h2>
      <div className='flex items-center justify-between gap-2 border-b border-blue-600 py-6'>
        <p className='text-2xl font-bold'>100 FUNDME</p>
        <Button
          variant='secondary'
          size='sm'
          className='px-6 font-semibold uppercase text-primary-default'
        >
          Claim
        </Button>
      </div>

      <ScrollArea className='mt-4 h-36'>
        <ul className='space-y-4'>
          {earnings.map((item, idx) => (
            <li key={idx} className='flex items-center gap-4'>
              <Calendar />

              <div className='text-sm'>
                <span className='font-bold'>
                  {item.type === 'claim' ? '-' : '+'} {item.amt} FUNDME
                </span>

                <div className='text-xs text-slate-300 lg:text-sm'>
                  {dayjs(item.date).format('MMMM Do, YYYY')} |{' '}
                  <span className='capitalize'> {item.type}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
