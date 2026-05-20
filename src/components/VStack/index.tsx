import { View } from 'react-native';
import { container } from './styles';
import { VStack as VStackGluestack } from '@/components/ui/vstack';
import { VStackProps } from './vstackDTO';

export function VStack({ reversed, space, children }: VStackProps) {
  return (
    <View style={container}>
      <VStackGluestack space={space} reversed={reversed}>
        {children}
      </VStackGluestack>
    </View>
  );
}
