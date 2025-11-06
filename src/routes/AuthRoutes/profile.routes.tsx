import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamsList } from '../../dtos/routeDTO';
import { Profile } from '../../pages/Auth/ProfileScreens/Profile';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function ProfileRoutes() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
