import { View } from "react-native";
import { container } from "./styles";
import { CardProps } from "./cardDTO";
import { Card as CardGlueStack } from "../ui/card";

export function Card({ children, size, variant }: CardProps) {
  return (
    <View style={container}>
      <CardGlueStack size={size} variant={variant}>
        {children}
      </CardGlueStack>
    </View>
  );
}
