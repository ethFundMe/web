'use client';

import { cn } from '@/lib/utils';
import { FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';

type Props = React.ComponentProps<'div'> & { status: boolean };

export const VerificationStepIndicator = ({ status, children }: Props) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        status ? 'black' : 'text-slate-400'
      )}
    >
      <span className='flex-shrink-0'>
        {status ? (
          <FaCheckCircle fill='rgb(22 163 74)' />
        ) : (
          <FaRegCheckCircle />
        )}
      </span>

      {children}
    </div>
  );
};
