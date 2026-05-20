import { View } from 'react-native';
import { container } from './styles';
import {
  Radio as RadioGluestack,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
} from '@/components/ui/radio';
import { RadioProps } from './radioDTO';
import { CircleIcon } from '@/components/ui/icon';

export function Radio({
  invalid,
  disabled,
  size,
  value,
  label,
  onChange,
}: RadioProps) {
  return (
    <View style={container}>
      <RadioGroup>
        <RadioGluestack
          value={value}
          size={size}
          isInvalid={invalid}
          isDisabled={disabled}
          onChange={onChange}
        >
          <RadioIndicator>
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
          <RadioLabel>{label}</RadioLabel>
        </RadioGluestack>
      </RadioGroup>
    </View>
  );
}
