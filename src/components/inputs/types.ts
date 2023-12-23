export type InputProps = React.ComponentProps<'input'> & {
  label?: string;
  error?: string;
};

export type SelectProps = React.ComponentProps<'select'> & {
  label?: string;
  error?: string;
};

export type TextareaProps = React.ComponentProps<'textarea'> & {
  label?: string;
  error?: string;
};
