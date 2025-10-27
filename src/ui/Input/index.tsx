import { Text, View } from 'react-native';
import { container, content, inputKitStyle } from './styles';
import { Input as InputKit } from '@ui-kitten/components';
import { EvaSize, EvaStatus } from '@ui-kitten/components/devsupport';

interface IInputProps {
  disabled?: boolean;
  value?: string;
  size?: EvaSize;
  placeholder?: string;
  label?: string;
  onChange?: () => void;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  status?: EvaStatus;
}

export function Input({
  disabled,
  value,
  size = 'medium',
  placeholder,
  label,
  onChange,
  iconLeft,
  iconRight,
  status = 'primary',
}: IInputProps) {
  return (
    <View style={container}>
      <View style={content}>
        <InputKit
          disabled={disabled}
          value={value}
          size={size}
          placeholder={placeholder}
          label={label}
          secureTextEntry={true}
          onChangeText={onChange}
          accessoryLeft={iconLeft}
          accessoryRight={iconRight}
          status={status}
          style={inputKitStyle}
        />
      </View>
    </View>
  );
}
