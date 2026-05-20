import { View } from "react-native";
import { container } from "./styles";
import { RadioProps } from "./radioDTO";
import {
  Radio as RadioGlueStack,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
} from "../ui/radio";
import { CircleIcon } from '@/components/ui/icon';

export function Radio({
  value,
  size,
  invalid,
  disabled,
  label,
  onChange,
}: RadioProps) {
  return (
    <View style={container}>
      <RadioGroup>
        <RadioGlueStack
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
        </RadioGlueStack>
      </RadioGroup>
    </View>
  );
}
