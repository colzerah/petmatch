import { View } from 'react-native';
import { container } from './styles';
import {
  Avatar as AvatarGluestack,
  AvatarFallbackText,
  AvatarImage,
  AvatarBadge,
} from '../ui/avatar';
import { AvatarProps } from './avatarDTO';

export function Avatar({
  size,
  fallbackText,
  uri,
  showBadge = false,
}: AvatarProps) {
  return (
    <View style={container}>
      <AvatarGluestack size={size}>
        <AvatarFallbackText>{fallbackText}</AvatarFallbackText>
        <AvatarImage
          source={{
            uri,
          }}
        />
        {showBadge && <AvatarBadge />}
      </AvatarGluestack>
    </View>
  );
}
