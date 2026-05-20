import { View } from "react-native";
import {
  Button as ButtonGlueStack,
  ButtonText,
  ButtonIcon,
} from "../ui/button";
import { ButtonProps } from "./ButtonDTO";
import { container } from "./styles";

export function Button({
  onPress,
  title,
  variant,
  size,
  disabled,
  action,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) {
  return (
    <View style={container}>
      <ButtonGlueStack
        {...props}
        onPress={onPress}
        variant={variant}
        size={size}
        disabled={disabled}
        action={action}
        className="rounded-xl"
      >
        {iconLeft && <ButtonIcon as={iconLeft} />}
        <ButtonText>{title}</ButtonText>
        {iconRight && <ButtonIcon as={iconRight} />}
      </ButtonGlueStack>
    </View>
  );
}
