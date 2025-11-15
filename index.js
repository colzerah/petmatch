/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';
import { name as appName } from './app.json';

// Handler para mensagens recebidas em background (app em segundo plano ou fechado)
// Envolvido em try/catch para evitar bloquear o registro do app
try {
  const firebaseMessaging = messaging();
  if (
    firebaseMessaging &&
    typeof firebaseMessaging.setBackgroundMessageHandler === 'function'
  ) {
    firebaseMessaging.setBackgroundMessageHandler(async remoteMessage => {
      console.log('Firebase: Mensagem recebida em background:', remoteMessage);
      // Processar mensagem aqui se necessário
    });
  }
} catch (e) {
  // Evita que uma falha no módulo nativo impeça o app de registrar
  console.log(
    '[FCM] setBackgroundMessageHandler indisponível. Prosseguindo sem background handler.',
    e?.message || e,
  );
}

AppRegistry.registerComponent(appName, () => App);
