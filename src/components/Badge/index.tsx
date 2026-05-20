import { View } from 'react-native';
import { Badge as BadgeGluestack, BadgeText, BadgeIcon } from '../ui/badge';
import { container } from './styles';
import { BadgeProps } from './badgeDTO';
import { ICON_MAP } from '@/dtos/iconDTO';

export function Badge({ iconName, action, variant, size, title }: BadgeProps) {
  const IconComponent = iconName ? ICON_MAP[iconName] : null;

  return (
    <View style={container}>
      <BadgeGluestack action={action} variant={variant} size={size}>
        <BadgeText>{title}</BadgeText>
        {IconComponent && <BadgeIcon as={IconComponent} className="ml-2" />}
      </BadgeGluestack>
    </View>
  );
}
