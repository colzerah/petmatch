import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../dtos/routeDTO';

import { Home } from '../pages/Home';
import { Model } from '../pages/Model';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Model" component={Model} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
