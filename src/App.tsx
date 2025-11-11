import '../global.css';
import React from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

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
