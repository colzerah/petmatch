import { ReactNode } from 'react';

export const CARD_SIZES = ['sm', 'md', 'lg'] as const;
export const CARD_VARIANTS = [
  'outline',
  'filled',
  'ghost',
  'elevated',
] as const;

export type CardSize = (typeof CARD_SIZES)[number];
export type CardVariant = (typeof CARD_VARIANTS)[number];

export interface CardProps {
  size?: CardSize;
  variant?: CardVariant;
  children?: ReactNode;
}
