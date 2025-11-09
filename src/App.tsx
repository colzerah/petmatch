import React from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import Routes from './routes';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate`',
  'Failed to open debugger',
  'HeadersTimeoutError',
]);

function App() {
  const isDarkMode = useColorScheme() === 'light';

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar
            barStyle={!isDarkMode ? 'light-content' : 'dark-content'}
          />
          <Routes />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
