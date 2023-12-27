'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { TextareaProps } from './types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, id, children, label, ...props }, ref) => {
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

        <textarea
          ref={ref}
          id={id}
          {...props}
          className={cn(
            'w-full rounded-md border border-neutral-300 px-4 py-3 outline-0 placeholder:text-neutral-700 focus:border-primary-default',
            className
          )}
        >
          {children}
        </textarea>

        {error && <p className='text-sm text-red-500'>{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
