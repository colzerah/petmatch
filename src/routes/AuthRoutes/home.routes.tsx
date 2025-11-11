import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@/pages/Auth/HomeScreens/Home';
import { RootStackParamsList } from '@/dtos/routeDTO';
import { Example } from '@/pages/Auth/HomeScreens/Example';
import { Model } from '@/pages/Auth/HomeScreens/Model';
import { Map } from '@/pages/Auth/HomeScreens/Map';
import { Componentes } from '@/pages/Auth/HomeScreens/Componentes';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function HomeRoutes() {
  return (
    <Stack.Navigator initialRouteName="Componentes">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Componentes" component={Componentes} />
      <Stack.Screen name="Example" component={Example} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Model" component={Model} />
    </Stack.Navigator>
  );
}
