import { View } from "react-native";
import { container } from "./styles";
import {
  Checkbox as CheckboxGlueStack,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "../ui/checkbox";
import { CheckboxProps } from "./checkboxDTO";
import { CheckIcon } from "@/components/ui/icon";

export function Checkbox({
  isDisabled,
  isInvalid,
  size,
  label,
  isChecked,
  value,
  isRequired,
  onChange,
}: CheckboxProps) {
  return (
    <View style={container}>
      <CheckboxGlueStack
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isChecked={isChecked}
        size={size}
        value={value}
        isRequired={isRequired}
        onChange={onChange}
      >
        <CheckboxIndicator>
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        <CheckboxLabel>{label}</CheckboxLabel>
      </CheckboxGlueStack>
    </View>
  );
}
