import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Pets } from '../../pages/App/PetsScreens/Pets';
import { RootStackParamList } from '../../dtos/routeDTO';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function PetsRoutes() {
  return (
    <Stack.Navigator initialRouteName="Pets">
      <Stack.Screen
        name="Pets"
        component={Pets}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
