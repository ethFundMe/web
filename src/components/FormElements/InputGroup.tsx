'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';
import { InputGroupProps } from './types';

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const focusStyles = {
      inputGroup: isFocused ? 'border-primary' : '',
    };

    return (
      <div>
        {/* {label && (
          <label htmlFor={id} className={cn('mb-1 block')}>
            {label}
          </label>
        )} */}

        <div
          className={cn(
            'overflow-hidden rounded-md border border-neutral-300',
            focusStyles.inputGroup,
            className
          )}
        >
          <input
            ref={ref}
            id={id}
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className='h-full w-full px-4 py-3 outline-0 placeholder:text-neutral-700'
          />
        </div>
      </div>
    );
  }
);

InputGroup.displayName = 'InputGroup';
