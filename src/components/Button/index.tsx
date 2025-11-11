import { View } from 'react-native';
import { container } from './styles';
import { Button as ButtonGluestack, ButtonText } from '../ui/button';
import { ButtonProps } from './buttonDTO';

export function Button({ onPress, title, variant, size, action }: ButtonProps) {
  return (
    <View style={container}>
      <ButtonGluestack
        variant={variant || 'solid'}
        size={size || 'md'}
        action={action || 'primary'}
        onPress={onPress}
      >
        <ButtonText>{title}</ButtonText>
      </ButtonGluestack>
    </View>
  );
}
