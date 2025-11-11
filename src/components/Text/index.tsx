import { View } from 'react-native';
import { container } from './styles';
import { Text as TextGluestack } from '../ui/text';
import { TextProps } from './textDTO';

export function Text({
  size,
  text,
  bold,
  isTruncated,
  italic,
  underline,
  strikeThrough,
  highlight,
}: TextProps) {
  return (
    <View style={container}>
      <TextGluestack
        size={size}
        className="text-center"
        bold={bold}
        isTruncated={isTruncated}
        italic={italic}
        underline={underline}
        strikeThrough={strikeThrough}
        highlight={highlight}
      >
        {text}
      </TextGluestack>
    </View>
  );
}
