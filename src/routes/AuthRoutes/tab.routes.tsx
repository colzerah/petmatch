import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeRoutes } from './home.routes';
import { MatchRoutes } from './match.routes';
import { WorksRoutes } from './work.routes';
import { ActivityRoutes } from './activity.routes';
import { ProfileRoutes } from './profile.routes';
import { RootTabParamList } from '@/dtos/routeDTO';
import { CustomTabBar } from './components/CustomTabBar/CustomTabBar';
import { RenderIcon } from './components/RenderIcon/RenderIcon';

const Tab = createBottomTabNavigator<RootTabParamList>();

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const renderTabIcon = (routeName: string) => {
  return ({ focused, color, size }: TabBarIconProps) => (
    <RenderIcon
      focused={focused}
      color={color}
      size={size}
      routeName={routeName}
    />
  );
};

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#703500', height: 70 },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#feecdc',
      }}
      tabBar={CustomTabBar}
    >
      <Tab.Screen
        name="HomeScreens"
        component={HomeRoutes}
        options={{
          tabBarIcon: renderTabIcon('HomeScreens'),
        }}
      />
      <Tab.Screen
        name="ActivityScreens"
        component={ActivityRoutes}
        options={{
          tabBarIcon: renderTabIcon('ActivityScreens'),
        }}
      />
      <Tab.Screen
        name="MatchScreens"
        component={MatchRoutes}
        options={{
          tabBarIcon: renderTabIcon('MatchScreens'),
        }}
      />
      <Tab.Screen
        name="WorksScreens"
        component={WorksRoutes}
        options={{
          tabBarIcon: renderTabIcon('WorksScreens'),
        }}
      />
      <Tab.Screen
        name="ProfilesScreens"
        component={ProfileRoutes}
        options={{
          tabBarIcon: renderTabIcon('ProfilesScreens'),
        }}
      />
    </Tab.Navigator>
  );
}
