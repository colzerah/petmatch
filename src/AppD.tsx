import React from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './redux/store';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { AppRoutes } from './routes/app.routes';

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate`']);

function AppD() {
  const { theme, isDarkMode } = useSelector(
    (state: RootState) => state.themeState,
  );

  return (
    <ApplicationProvider {...eva} theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppRoutes />
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default AppD;
