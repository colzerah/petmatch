import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeRoutes } from './home.routes';
import { PetsRoutes } from './pets.routes';
import { RenderIcon } from './components/RenderIcon/RenderIcon';
import { CustomTabBar } from './components/CustomTabBar/CustomTabBar';

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const renderTabIcon = (routeName: string) => {
  return ({ focused, color, size }: TabBarIconProps) => (
    <RenderIcon
      routeName={routeName}
      focused={focused}
      color={color}
      size={size}
    />
  );
};

export function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreens"
      screenOptions={{
        headerShown: false,
        // tabBarStyle: { backgroundColor: '#fff', height: 70 },
        // tabBarActiveTintColor: '#FF7A18',
        // tabBarInactiveTintColor: '#A88A72',
      }}
      tabBar={CustomTabBar}
    >
      <Tab.Screen
        name="HomeScreens"
        component={HomeRoutes}
        options={{
          tabBarIcon: renderTabIcon('HomeScreens'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PetsScreens"
        component={PetsRoutes}
        options={{
          tabBarIcon: renderTabIcon('PetsScreens'),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
