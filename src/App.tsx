import '../global.css';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { initializeNotifications } from './services/push/notifications';

import Routes from './routes';

LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate`',
  'Failed to open debugger',
  'HeadersTimeoutError',
  'SafeAreaView has been deprecated',
]);

function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    // Inicializar Firebase Cloud Messaging
    let cleanup: (() => void) | undefined;

    initializeNotifications().then(unsubscribe => {
      if (typeof unsubscribe === 'function') {
        cleanup = unsubscribe;
      }
    });

    // Cleanup listeners quando app é desmontado
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GluestackUIProvider mode="light">
          <NavigationContainer>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Routes />
          </NavigationContainer>
        </GluestackUIProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
