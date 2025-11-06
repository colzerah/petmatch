import type { IconProps } from 'phosphor-react-native';
import { ComponentType } from 'react';

export type FloatButtonType =
  | 'like'
  | 'dislike'
  | 'back'
  | 'superlike'
  | 'default';

export type FloatButtonSize = 'small' | 'normal';

export interface TypeConfigItem {
  color: string;
  icon: ComponentType<IconProps>;
}

export type TypeConfigMap = Record<FloatButtonType, TypeConfigItem>;

export interface FloatButtonProps {
  type?: FloatButtonType;
  size?: FloatButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
