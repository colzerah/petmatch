export const SWITCH_SIZES = ['sm', 'md', 'lg'] as const;

export type SwitchSize = (typeof SWITCH_SIZES)[number];

export interface SwitchProps {
  size?: SwitchSize;
  disabled?: boolean;
}
