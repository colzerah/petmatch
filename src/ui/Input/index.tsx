import { View, Text } from 'react-native';
import {
  Input as GluestackInput,
  InputField,
  InputSlot,
} from '@/components/ui/input';

type InputSize = 'sm' | 'md' | 'lg' | 'xl';

interface IInputProps {
  disabled?: boolean;
  value?: string;
  size?: InputSize;
  placeholder?: string;
  label?: string;
  onChange?: (text: string) => void;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  isInvalid?: boolean;
  secureTextEntry?: boolean;
}

export function Input({
  disabled,
  value,
  size = 'md',
  placeholder,
  label,
  onChange,
  iconLeft,
  iconRight,
  isInvalid = false,
  secureTextEntry = false,
}: IInputProps) {
  return (
    <View>
      {label && (
        <Text className="text-sm font-medium mb-1 text-typography-900">
          {label}
        </Text>
      )}
      <GluestackInput
        variant="outline"
        size={size}
        isDisabled={disabled}
        isInvalid={isInvalid}
      >
        {iconLeft && <InputSlot className="pl-3">{iconLeft}</InputSlot>}
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
        />
        {iconRight && <InputSlot className="pr-3">{iconRight}</InputSlot>}
      </GluestackInput>
    </View>
  );
}
