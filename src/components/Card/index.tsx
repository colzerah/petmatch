import { View } from 'react-native';
import { container } from './styles';
import { Card as CardGluestack } from '@/components/ui/card';
import { CardProps } from './cardDTO';

export function Card({ size, variant, children }: CardProps) {
  return (
    <View style={container}>
      <CardGluestack variant={variant} size={size}>
        {children}
      </CardGluestack>
    </View>
  );
}
