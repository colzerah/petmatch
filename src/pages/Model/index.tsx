import { View, Text } from 'react-native';
import { Input } from '../../ui/Input';

export function Model() {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ margin: 10 }}>Model Page</Text>

      <View style={{ width: 300 }}>
        <Input placeholder="Digite aqui" />
      </View>
      <Text style={{ alignItems: 'center', marginTop: 10 }}>Input Content</Text>
    </View>
  );
}
