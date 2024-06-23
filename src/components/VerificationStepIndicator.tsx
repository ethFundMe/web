'use client';

import { cn } from '@/lib/utils';
import { FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';

type Props = React.ComponentProps<'div'> & { status: boolean };

export const VerificationStepIndicator = ({ status, children }: Props) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        status ? 'text-green-600' : 'text-slate-400'
      )}
    >
      {status ? <FaCheckCircle fill='rgb(22 163 74)' /> : <FaRegCheckCircle />}

      {children}
    </div>
  );
};
