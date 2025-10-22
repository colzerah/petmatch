import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';

export function Home() {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Text>Home Page</Text>
      <Button onPress={() => navigation.navigate('Model')}>Navegar</Button>
    </View>
  );
}
