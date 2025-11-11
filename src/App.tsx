import '../global.css';
import React from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';

import Routes from './routes';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate`',
  'Failed to open debugger',
  'HeadersTimeoutError',
  'SafeAreaView has been deprecated',
]);

function App() {
  const isDarkMode = useColorScheme() === 'light';

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <OverlayProvider>
          <ToastProvider>
            <NavigationContainer>
              <StatusBar
                barStyle={!isDarkMode ? 'light-content' : 'dark-content'}
              />
              <Routes />
            </NavigationContainer>
          </ToastProvider>
        </OverlayProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
