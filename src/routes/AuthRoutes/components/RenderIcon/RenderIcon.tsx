import React from 'react';
import {
  HouseIcon,
  MapPinIcon,
  HandHeartIcon,
  UserCircleIcon,
  HandshakeIcon,
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
  ActivityScreens: MapPinIcon,
  MatchScreens: HandHeartIcon,
  WorksScreens: HandshakeIcon,
  ProfilesScreens: UserCircleIcon,
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
      size={size}
      color={color}
      weight={focused ? 'fill' : ('regular' as IconWeight)}
    />
  );
}
