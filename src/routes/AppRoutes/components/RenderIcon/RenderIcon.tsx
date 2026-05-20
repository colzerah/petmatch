import React from 'react';
import {
  HouseIcon,
  DogIcon,
  IconProps as PhosphorIconProps,
  IconWeight,
} from 'phosphor-react-native';

interface RenderIconProps {
  focused: boolean;
  color: string;
  size: number;
  routeName: string;
}

type IconComponent = React.ComponentType<PhosphorIconProps>;

const ICONS: Record<string, IconComponent> = {
  HomeScreens: HouseIcon,
  PetsScreens: DogIcon,
};

export function RenderIcon({
  focused,
  color,
  size,
  routeName,
}: RenderIconProps) {
  const Icon = ICONS[routeName];

  if (!Icon) {
    return null;
  }

  return (
    <Icon
      weight={focused ? 'fill' : ('regular' as IconWeight)}
      color={color}
      size={size}
    />
  );
}
