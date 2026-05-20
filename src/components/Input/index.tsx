import { View } from 'react-native';
import { container } from './styles';
import { Input as InputGluestack, InputField } from '../ui/input';
import { InputProps } from './inputDTO';

export function Input({
  variant,
  size,
  isDisabled,
  isInvalid,
  isReadOnly,
  placeholder,
  value,
  onChangeText,
}: InputProps) {
  return (
    <View style={container}>
      <InputGluestack
        variant={variant || 'outline'}
        size={size || 'md'}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
      >
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </InputGluestack>
    </View>
  );
}
