import { Text, TouchableOpacity, View } from 'react-native';
import { AnimatedTabIcon } from '../AnimatedTabIcon/AnimatedTabIcon';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { buttonTab, container, titleTab } from './styles';

const routeLabels = {
  HomeScreens: 'Home',
  ActivityScreens: 'Atividade',
  MatchScreens: 'Match',
  WorksScreens: 'Trabalhos',
  ProfilesScreens: 'Perfil'
};

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={container}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];
        const onPress = () => navigation.navigate(route.name);
        const textTabColor = '#feecdc';

        const icon = options.tabBarIcon?.({
          focused,
          color: '#feecdc',
          size: focused ? 26 : 22,
        });

        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={buttonTab}>
            <AnimatedTabIcon focused={focused}>{icon}</AnimatedTabIcon>
            <Text style={[{ color: textTabColor }, { ...titleTab }]}>
              {routeLabels[route.name as keyof typeof routeLabels] || route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
