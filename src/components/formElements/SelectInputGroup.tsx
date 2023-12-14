'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';
import { SelectInputGroupProps } from './types';

export const SelectInputGroup = forwardRef<
  HTMLSelectElement,
  SelectInputGroupProps
>(({ className, label, id, error, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const focusStyles = {
    inputGroup: isFocused ? 'border-primary-dafault' : '',
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={cn('mb-1 block w-fit cursor-pointer font-semibold')}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          'overflow-hidden rounded-md border border-neutral-300',
          focusStyles.inputGroup,
          error && 'mb-1',
          className
        )}
      >
        <select
          ref={ref}
          id={id}
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='h-full w-full p-3 outline-0'
        >
          {props.children}
        </select>
      </div>

      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
});

SelectInputGroup.displayName = 'SelectInputGroup';
