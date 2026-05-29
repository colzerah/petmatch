import { View } from 'react-native';
import {
  Input as InputGlueStack,
  InputField,
  InputSlot,
  InputIcon,
} from '../ui/input';
import { container } from './styles';
import { InputProps } from './inputDTO';
import { Typography } from '../Typography';

export function Input({
  variant,
  size,
  placeholder,
  placeholderTextColor,
  isDisabled,
  isInvalid,
  isRequired,
  iconLeft,
  iconRight,
  value,
  label,
  onChangeText,
  onPress,
  type,
  ...props
}: InputProps) {
  return (
    <View style={container}>
      {label && <Typography title={label} size="lg" bold />}
      <InputGlueStack
        variant={variant}
        size={size}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        className="bg-primary-0 rounded-md"
      >
        {iconLeft && (
          <InputSlot className="pl-3">
            <InputIcon as={iconLeft} />
          </InputSlot>
        )}
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          type={type}
          placeholderTextColor={placeholderTextColor}
          {...props}
        />
        {iconRight && (
          <InputSlot className="pr-3" onPress={onPress}>
            <InputIcon as={iconRight} />
          </InputSlot>
        )}
      </InputGlueStack>
    </View>
  );
}
