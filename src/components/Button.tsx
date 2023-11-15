import { cn } from '@/lib/utils';
import { ButtonProps, ButtonStyles } from './types';

export const Button = ({
  children,
  className,
  size = 'md',
  variant = 'primary',
  wide,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        ButtonStyle.base,
        ButtonStyle.size[size],
        wide && ButtonStyle.wide,
        ButtonStyle.variant[variant],
        disabled && 'cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonStyle: ButtonStyles = {
  base: 'rounded-md bg-white text-black transition-all duration-150 ease-in hover:bg-opacity-80 active:scale-95',
  size: {
    sm: 'py-2 px-4',
    md: 'py-3 px-5',
    lg: 'py-5 px-8',
  },
  variant: {
    primary: 'bg-primary text-white',
    secondary: 'bg-primaryDark text-white',
    tertiary: 'bg-customGray text-black',
  },
  wide: 'w-full',
};
