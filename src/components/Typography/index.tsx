import { View } from "react-native";
import { container } from "./styles";
import { Text as TextGlueStack } from "../ui/text";
import { TypographyProps } from "./typographyDTO";

export function Typography({
  title,
  bold,
  italic,
  underline,
  size,
}: TypographyProps) {
  return (
    <View style={container}>
      <TextGlueStack
        bold={bold}
        italic={italic}
        underline={underline}
        size={size}
      >
        {title}
      </TextGlueStack>
    </View>
  );
}
