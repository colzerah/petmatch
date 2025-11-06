import { View, Text } from 'react-native';
import { FloatButton } from '@ui/FloatButton';
import { Input } from '@ui/Input';

export function Model() {
  return (
    <View style={{ alignItems: 'center', gap: 20 }}>
      <Text style={{ margin: 10 }}>Model Page</Text>
      <View style={{ width: 300 }}>
        <Input placeholder="Digite aqui" />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', gap: 20 }}>
        <FloatButton size="small" type="back" top={10} right={90} />
        <FloatButton size="normal" type="dislike" top={20} right={10} />
        <FloatButton size="normal" type="like" top={20} left={10} />
        <FloatButton size="small" type="superlike" top={10} left={90} />
      </View>
    </View>
  );
}
