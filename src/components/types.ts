type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'blanc' | 'noire';

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
