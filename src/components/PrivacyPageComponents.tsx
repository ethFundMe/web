import { cn } from '@/lib/utils';

export function Heading({
  children,
  className,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'border-b border-slate-500 pb-2 text-xl font-bold md:text-2xl',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function PGroup({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('space-y-4 md:text-lg', className)} {...props}>
      {children}
    </div>
  );
}
