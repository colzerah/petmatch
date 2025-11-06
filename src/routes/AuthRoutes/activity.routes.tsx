import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamsList } from '@dtos/routeDTO';
import { Stores } from '@pages/Auth/ActivityScreens/Stores';
import { Veterinarians } from '@pages/Auth/ActivityScreens/Veterinarians';
import { Activities } from '@pages/Auth/ActivityScreens/Activities';
import { Adoptions } from '@pages/Auth/ActivityScreens/Adoptions';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function ActivityRoutes() {
  return (
    <Stack.Navigator initialRouteName="Activities">
      <Stack.Screen name="Activities" component={Activities} />
      <Stack.Screen name="Stores" component={Stores} />
      <Stack.Screen name="Veterinarians" component={Veterinarians} />
      <Stack.Screen name="Adoptions" component={Adoptions} />
    </Stack.Navigator>
  );
}
