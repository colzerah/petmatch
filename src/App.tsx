import React from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import Routes from './routes';

LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate`',
  'Failed to open debugger',
  'HeadersTimeoutError',
]);

function App() {
  const isDarkMode = useColorScheme() === 'light';
  const theme = isDarkMode ? eva.dark : eva.light;

  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={theme}>
        <Provider store={store}>
          <NavigationContainer>
            <StatusBar
              barStyle={!isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Routes />
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}

export default App;
