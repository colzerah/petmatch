import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../../pages/App/Login';
import { RootStackParamList } from '../../dtos/routeDTO';
import { Register } from '../../pages/App/Register';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
