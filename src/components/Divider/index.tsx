import { View } from 'react-native';
import { container } from './styles';
import { Divider as DividerGluestack } from '@/components/ui/divider';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ orientation }: DividerProps) {
  return (
    <View style={container}>
      <DividerGluestack
        className={`my-2 bg-indigo-500`}
        orientation={orientation}
      />
    </View>
  );
}
