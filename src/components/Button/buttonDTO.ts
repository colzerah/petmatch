import React from 'react';

export interface ButtonProps {
  onPress?: () => void;
  title: string;
  action?: 'primary' | 'secondary' | 'positive' | 'negative';
  variant?: 'solid' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  secondary?: boolean;
  iconLeft?: React.ComponentType<any>; // resolveu por enquanto
  iconRight?: React.ComponentType<any>; // resolveu por enquanto
}
