import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../dtos/routeDTO';

import { Home } from '../pages/Home';

import { Model } from '../pages/Model';
import { Map } from '../pages/Map';
import { Model2 } from '../Model2';
import { Example } from '../pages/Example';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Example">
      <Stack.Screen name="Model" component={Model} />
      <Stack.Screen name="Model2" component={Model2} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Example" component={Example} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}
