import { View } from 'react-native';
import { container } from './styles';
import { Switch as SwitchGluestack } from '@/components/ui/switch';
import { SwitchProps } from './switchDTO';

export function Switch({ size, disabled }: SwitchProps) {
  return (
    <View style={container}>
      <SwitchGluestack
        size={size}
        isDisabled={disabled}
        trackColor={{ false: '#d4d4d4', true: '#525252' }}
        thumbColor="#fafafa"
        ios_backgroundColor="#d4d4d4"
      />
    </View>
  );
}
