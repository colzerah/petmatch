export const TOAST_ACTIONS = [
  'success',
  'error',
  'warning',
  'info',
  'muted',
] as const;

export const TOAST_VARIANTS = ['outline', 'solid'] as const;

export const TOAST_PLACEMENTS = [
  'top',
  'top right',
  'top left',
  'bottom',
  'bottom left',
  'bottom right',
] as const;

export type ToastPlacement = (typeof TOAST_PLACEMENTS)[number];
export type ToastAction = (typeof TOAST_ACTIONS)[number];
export type ToastVariant = (typeof TOAST_VARIANTS)[number];

export interface CustomToastOptions {
  title: string;
  description?: string;
  action?: ToastAction;
  variant?: ToastVariant;
  placement?: ToastPlacement;
  duration?: number;
}

export interface ToastProps {
  id?: string;
  title: string;
  description?: string;
  action?: ToastAction;
  variant?: ToastVariant;
}
