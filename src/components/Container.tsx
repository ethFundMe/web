import { cn } from '@/lib/utils';

type ContainerProps = React.ComponentProps<'div'>;

export const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div
      className={cn('mx-auto w-full max-w-screen-xl px-4', className)}
      {...rest}
    >
      {children}
    </div>
  );
};
