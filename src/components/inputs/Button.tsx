import { cn } from '@/lib/utils';
import { ButtonProps, ButtonStyles } from '../types';

export const Button = ({
  children,
  className,
  size = 'md',
  variant = 'primary',
  wide,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        ButtonStyle.base,
        ButtonStyle.size[size],
        wide && ButtonStyle.wide,
        ButtonStyle.variant[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonStyle: ButtonStyles = {
  base: 'rounded-md bg-white text-black transition-all duration-200 ease-in hover:bg-opacity-80 active:scale-95',
  size: {
    sm: 'py-2 px-4',
    md: 'py-3 px-5',
    lg: 'py-5 px-8',
  },
  variant: {
    primary: 'bg-primary-default text-white',
    secondary: 'bg-primary-dark text-white',
    tertiary: 'bg-primary-gray text-black',
    blanc: 'bg-white text-black',
    noire: 'bg-black text-white',
  },
  wide: 'w-full',
};
