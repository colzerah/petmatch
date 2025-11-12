import { IconName } from '@/dtos/iconDTO';

export const ALERT_ACTIONS = [
  'success',
  'error',
  'warning',
  'info',
  'muted',
] as const;

export const ALERT_VARIANTS = ['outline', 'solid'] as const;

export type AlertAction = (typeof ALERT_ACTIONS)[number];
export type AlertVariant = (typeof ALERT_VARIANTS)[number];

export interface AlertProps {
  iconName?: IconName;
  action?: AlertAction;
  variant?: AlertVariant;
  title?: string;
}
