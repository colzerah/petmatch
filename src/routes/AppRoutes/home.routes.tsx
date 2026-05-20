import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../../pages/App/HomeScreens/Home';
import { RootStackParamList } from '../../dtos/routeDTO';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function HomeRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
