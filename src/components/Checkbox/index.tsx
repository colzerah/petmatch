import { View } from 'react-native';
import { container } from './styles';
import {
  Checkbox as CheckboxGluestack,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { CheckboxProps } from './checkboxDTO';

export function Checkbox({
  disabled,
  invalid,
  size,
  label,
  value,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <View style={container}>
      <CheckboxGluestack
        value={value}
        isDisabled={disabled}
        isInvalid={invalid}
        isChecked={checked}
        size={size}
        onChange={onChange}
      >
        <CheckboxIndicator>
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        <CheckboxLabel>{label}</CheckboxLabel>
      </CheckboxGluestack>
    </View>
  );
}
