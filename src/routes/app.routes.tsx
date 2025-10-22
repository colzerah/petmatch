import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../dtos/routeDTO';

import { Home } from '../pages/Home';
import { Example } from '../pages/Example';
import { Model } from '../pages/Model';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Example">
      <Stack.Screen name="Model" component={Model} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Example" component={Example} />
    </Stack.Navigator>
  );
}
