export const TEXTAREA_SIZES = ['sm', 'md', 'lg', 'xl'] as const;

export type TextAreaSize = (typeof TEXTAREA_SIZES)[number];

export interface TextAreaProps {
  size?: TextAreaSize;
  invalid?: boolean;
  disabled?: boolean;
  placeholder?: string;
}
