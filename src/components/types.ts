export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type ButtonStyles = {
  base?: string;
  size: Record<ButtonSize, string>;
  wide: string;
  variant: Record<ButtonVariant, string>;
};

export type ButtonProps = React.ComponentProps<'button'> & {
  size?: ButtonSize;
  wide?: boolean;
  variant?: ButtonVariant;
};
