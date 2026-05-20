import { View } from 'react-native';
import { container } from './styles';
import { Heading as HeadingGluestack } from '@/components/ui/heading';
import { HeadingProps } from './headingDTO';

export function Heading({ title, size }: HeadingProps) {
  return (
    <View style={container}>
      <HeadingGluestack size={size}>{title}</HeadingGluestack>
    </View>
  );
}
