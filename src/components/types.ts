export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'blanc'
  | 'noire';

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

export type CampaignCategoryType =
  | 'family'
  | 'accident'
  | 'natural disaster'
  | 'humanitarian'
  | 'emergency'
  | 'animals'
  | 'medical';

export type CampaignCategory = {
  image: string;
  type: CampaignCategoryType;
  description: string;
};

export type CampaignCategoryCardProps = {
  category: CampaignCategory;
  handleOnClick: () => void;
};
