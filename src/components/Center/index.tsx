import { View } from 'react-native';
import { container } from './styles';
import { Center as CenterGluestack } from '@/components/ui/center';
import { CenterProps } from './centerDTO';

export function Center({ children }: CenterProps) {
  return (
    <View style={container}>
      <CenterGluestack>{children}</CenterGluestack>
    </View>
  );
}
