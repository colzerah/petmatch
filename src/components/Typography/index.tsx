import { View } from 'react-native';
import { container } from './styles';
import { Text as TextGlueStack } from '../ui/text';
import { TypographyProps, colorMap } from './typographyDTO';

export function Typography({
  title,
  bold,
  italic,
  underline,
  size,
  sub,
  type = 'black',
}: TypographyProps) {
  const textColor = colorMap[type];

  return (
    <View style={container}>
      <TextGlueStack
        bold={bold}
        italic={italic}
        underline={underline}
        size={size}
        sub={sub}
        style={{ color: textColor }}
      >
        {title}
      </TextGlueStack>
    </View>
  );
}
