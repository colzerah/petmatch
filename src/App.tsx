import React from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { AppRoutes } from './routes/app.routes';

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate`']);

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? eva.dark : eva.light;

  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={theme}>
        <Provider store={store}>
          <NavigationContainer>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppRoutes />
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}

export default App;
