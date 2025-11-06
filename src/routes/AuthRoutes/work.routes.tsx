import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Works } from '@pages/Auth/WorksScreens/Works';
import { RootStackParamsList } from '@dtos/routeDTO';
import { Jobs } from '@pages/Auth/WorksScreens/Jobs';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function WorksRoutes() {
  return (
    <Stack.Navigator initialRouteName="Works">
      <Stack.Screen name="Works" component={Works} />
      <Stack.Screen name="Jobs" component={Jobs} />
    </Stack.Navigator>
  );
}
