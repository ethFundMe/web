'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { TextAreaInputGroupProps } from './types';

export const TextAreaInputGroup = forwardRef<
  HTMLTextAreaElement,
  TextAreaInputGroupProps
>(({ className, id, children, ...props }, ref) => {
  return (
    <div>
      {/* {label && (
          <label htmlFor={id} className={cn('mb-1 block')}>
            {label}
          </label>
        )} */}

      <textarea
        ref={ref}
        id={id}
        {...props}
        className={cn(
          'w-full rounded-md border border-neutral-300 px-4 py-3 outline-0 placeholder:text-neutral-700 focus:border-primary',
          className
        )}
      >
        {children}
      </textarea>
    </div>
  );
});

TextAreaInputGroup.displayName = 'TextAreaInputGroup';
