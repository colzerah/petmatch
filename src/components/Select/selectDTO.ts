export const SELECT_VARIANTS = ['rounded', 'outline', 'underlined'] as const;
export const SELECT_SIZES = ['sm', 'md', 'lg', 'xl'] as const;

export type SelectVariant = (typeof SELECT_VARIANTS)[number];
export type SelectSize = (typeof SELECT_SIZES)[number];

export interface SelectItem {
  value: string;
  label: string;
}

export interface SelectProps {
  placeholder?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  items: SelectItem[];
  disabled?: boolean;
  invalid?: boolean;
  snapPoints?: Array<number>;
  onOpen?: () => void;
  onClose?: () => void;
  onValueChange?: (value: string) => void;
}
