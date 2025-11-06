import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Match } from '@pages/Auth/MatchScreens/Match';
import { RootStackParamsList } from '@dtos/routeDTO';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function MatchRoutes() {
  return (
    <Stack.Navigator initialRouteName="Match">
      <Stack.Screen name="Match" component={Match} />
    </Stack.Navigator>
  );
}
