import { View } from "react-native";
import { container } from "./styles";
import { HStackProps } from "./hstackDTO";
import { HStack as HStackGlueStack } from "../ui/hstack";

export function HStack({ reversed, space, children }: HStackProps) {
  return (
    <View style={container}>
      <HStackGlueStack space={space} reversed={reversed}>
        {children}
      </HStackGlueStack>
    </View>
  );
}
