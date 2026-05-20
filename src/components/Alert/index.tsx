import { View } from 'react-native';
import { Alert as AlertGluestack, AlertIcon, AlertText } from '../ui/alert';
import { container } from './styles';
import { AlertProps } from './alertDTO';
import { ICON_MAP } from '@/dtos/iconDTO';

export function Alert({ iconName, title, action, variant }: AlertProps) {
  const IconComponent = iconName ? ICON_MAP[iconName] : null;

  return (
    <View style={container}>
      <AlertGluestack action={action} variant={variant}>
        {IconComponent && <AlertIcon as={IconComponent} />}
        <AlertText>{title}</AlertText>
      </AlertGluestack>
    </View>
  );
}
