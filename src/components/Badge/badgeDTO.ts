import { IconName } from '@/dtos/iconDTO';

export const BADGE_ACTIONS = [
  'success',
  'error',
  'warning',
  'info',
  'muted',
] as const;

export const BADGE_VARIANTS = ['outline', 'solid'] as const;

export const BADGE_SIZES = ['sm', 'md', 'lg'] as const;

export type BadgeAction = (typeof BADGE_ACTIONS)[number];
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
export type BadgeSize = (typeof BADGE_SIZES)[number];

export interface BadgeProps {
  iconName?: IconName;
  action?: BadgeAction;
  variant?: BadgeVariant;
  size?: BadgeSize;
  title?: string;
}
