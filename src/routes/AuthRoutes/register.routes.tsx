import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterType } from "../../pages/Auth/RegisterScreens/RegisterType";
import { RegisterForm } from "../../pages/Auth/RegisterScreens/RegisterForm";
import { RegisterValidation } from "../../pages/Auth/RegisterScreens/RegisterValidation";
import { RootStackParamList } from "../../dtos/routeDTO";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RegisterRoutes() {
  return (
    <Stack.Navigator initialRouteName="RegisterType">
      <Stack.Screen
        name="RegisterType"
        component={RegisterType}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterForm"
        component={RegisterForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterValidation"
        component={RegisterValidation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
