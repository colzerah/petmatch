import React, { useState } from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import * as eva from '@eva-design/eva';
import { AppRoutes } from './routes/app.routes';
import { ThemeProvider } from './hooks/useTheme';

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate`']);

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? eva.dark : eva.light;

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppRoutes />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
