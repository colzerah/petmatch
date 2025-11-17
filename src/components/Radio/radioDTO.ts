export const RADIO_SIZES = ['sm', 'md', 'lg'] as const;

export type RadioSize = (typeof RADIO_SIZES)[number];

export interface RadioProps {
  value: string;
  size?: RadioSize;
  invalid?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: () => void;
}
