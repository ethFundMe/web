'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';
import { InputProps, SelectProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const focusStyles = {
      input: isFocused ? 'border-primary-default' : '',
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
            focusStyles.input,
            error && 'mb-1',
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

        {error && <p className='text-sm text-red-500'>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, id, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const focusStyles = {
      input: isFocused ? 'border-primary-dafault' : '',
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
            focusStyles.input,
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
  }
);

Select.displayName = 'Select';
