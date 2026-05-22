import React from 'react';
import { IconProps } from 'phosphor-react-native';

export function createIcon(
  IconComponent: React.ComponentType<IconProps>,
  defaultProps?: Partial<IconProps>,
) {
  return function WrappedIcon({ weight, color, size }: IconProps) {
    return (
      <IconComponent
        weight={weight}
        color={color}
        size={size}
        {...defaultProps}
      />
    );
  };
}
