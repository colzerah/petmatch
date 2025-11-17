/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { setupBackgroundMessaging } from './src/services/push/notifications';

setupBackgroundMessaging();

AppRegistry.registerComponent(appName, () => App);
