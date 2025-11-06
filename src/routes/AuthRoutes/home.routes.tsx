import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@pages/Auth/HomeScreens/Home';
import { RootStackParamsList } from '@dtos/routeDTO';
import { Example } from '@pages/Auth/HomeScreens/Example';
import { Model } from '@pages/Auth/HomeScreens/Model';
import { Map } from '@pages/Auth/HomeScreens/Map';
import { Model2 } from '@/pages/Auth/HomeScreens/Model2';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function HomeRoutes() {
  return (
    <Stack.Navigator initialRouteName="Example">
      <Stack.Screen name="Model" component={Model} />
      <Stack.Screen name="Model2" component={Model2} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Example" component={Example} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Model" component={Model} />
    </Stack.Navigator>
  );
}
