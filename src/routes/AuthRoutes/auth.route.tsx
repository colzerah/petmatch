import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../dtos/routeDTO';

import { Login } from '../../pages/Auth/Login';
import { RegisterRoutes } from './register.routes';
import { ResetPassword } from '@/pages/Auth/ResetPassword';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterRoutes"
        component={RegisterRoutes}
        options={{ title: 'Criar Conta', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: 'Criar nova senha', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}
