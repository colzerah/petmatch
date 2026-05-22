import { View } from 'react-native';
import {
  Button as ButtonGlueStack,
  ButtonText,
  ButtonIcon,
} from '../ui/button';
import { ButtonProps } from './ButtonDTO';
import { container } from './styles';

export function Button({
  onPress,
  title,
  variant,
  size,
  disabled,
  action,
  secondary,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) {
  const secondaryClass = secondary ? 'bg-white' : '';
  const secondaryTextClass = secondary ? 'text-black' : '';

  return (
    <View style={container}>
      <ButtonGlueStack
        {...props}
        onPress={onPress}
        variant={variant}
        size={size}
        disabled={disabled}
        action={action}
        className={`rounded-xl ${secondaryClass}`}
      >
        {iconLeft && <ButtonIcon as={iconLeft} />}
        <ButtonText className={secondaryTextClass}>{title}</ButtonText>
        {iconRight && <ButtonIcon as={iconRight} />}
      </ButtonGlueStack>
    </View>
  );
}
