import { View } from 'react-native';
import { container } from './styles';
import { Box as BoxGluestack } from '@/components/ui/box';
import { BoxProps } from './boxDTO';

export function Box({ children }: BoxProps) {
  return (
    <View style={container}>
      <BoxGluestack>{children}</BoxGluestack>
    </View>
  );
}
