export const CHECKBOX_SIZES = ['sm', 'md', 'lg'] as const;

export type CheckboxSize = (typeof CHECKBOX_SIZES)[number];

export interface CheckboxProps {
  disabled?: boolean;
  invalid?: boolean;
  size?: CheckboxSize;
  label?: string;
  value: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}
