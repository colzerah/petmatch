import {
  Toast as ToastGluestack,
  ToastTitle,
  ToastDescription,
} from '@/components/ui/toast';

import { ToastProps } from './toastDTO';

export function Toast({ description, id, action, variant, title }: ToastProps) {
  return (
    <ToastGluestack nativeID={id} action={action} variant={variant}>
      <ToastTitle>{title}</ToastTitle>
      {description && <ToastDescription>{description}</ToastDescription>}
    </ToastGluestack>
  );
}
