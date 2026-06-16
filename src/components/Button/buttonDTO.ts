import { IconButtonName } from '@/dtos/iconDTO';

export interface ButtonProps {
  onPress?: () => void;
  title: string;
  action?: 'primary' | 'secondary' | 'positive' | 'negative';
  variant?: 'solid' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  secondary?: boolean;
  iconLeft?: IconButtonName; // resolveu por enquanto
  iconRight?: IconButtonName; // resolveu por enquanto
}
