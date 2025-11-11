import { View } from 'react-native';
import { container } from './styles';
import { HStack as HStackGluestack } from '@/components/ui/hstack';
import { HStackProps } from './hstackDTO';

export function HStack({ reversed, space, children }: HStackProps) {
  return (
    <View style={container}>
      <HStackGluestack space={space} reversed={reversed}>
        {children}
      </HStackGluestack>
    </View>
  );
}
