import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { Platform, PermissionsAndroid } from 'react-native';

// Verifica se o Firebase está configurado (GoogleService-Info.plist / google-services.json)
const isFirebaseConfigured = (): boolean => {
  try {
    // Se não houver app default, `firebase.app()` lança 'app/no-app'
    firebase.app();
    return true;
  } catch {
    return false;
  }
};

/**
 * Log detalhado do estado de configuração do Firebase.
 * Útil para diagnosticar ausência de plist ou json nativos.
 */
export const logFirebaseDiagnostics = () => {
  const configured = isFirebaseConfigured();
  console.log('[FirebaseDiag] isConfigured:', configured);
  if (!configured) {
    console.log(
      '[FirebaseDiag] Falta configuração nativa. iOS: adicionar GoogleService-Info.plist em ios/petmatch/. Android: google-services.json em android/app/.',
    );
    return;
  }
  try {
    const appInstance = firebase.app();
    console.log('[FirebaseDiag] App name:', appInstance.name);
    console.log('[FirebaseDiag] Opções:', appInstance.options);
  } catch {
    console.log('[FirebaseDiag] Erro ao obter instância firebase.');
  }
};

/**
 * Solicita permissão para receber notificações push
 * @returns Promise<boolean> - true se permissão foi concedida
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (!isFirebaseConfigured()) {
      console.log(
        '❌ Firebase: não configurado. Ignorando solicitação de permissão de notificação.',
      );
      return false;
    }

    console.log('🔔 Solicitando permissão de notificação...');

    // Android 13+ requer permissão explícita
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('❌ Firebase: Permissão de notificação negada no Android');
        return false;
      }
    }

    // iOS e Android < 13
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log(
        `✅ Firebase: Permissão de notificação concedida (status: ${authStatus})`,
      );
      await getDeviceToken();
    } else {
      console.log(
        `❌ Firebase: Permissão de notificação negada (status: ${authStatus})`,
      );
    }

    return enabled;
  } catch (error) {
    console.error('❌ Firebase: Erro ao solicitar permissão:', error);
    return false;
  }
};

// getInstallationId removido - não é necessário para FCM básico
// O Firebase Messaging gerencia Installation IDs internamente

// getInstallationAuthToken removido - não é necessário para FCM básico

/**
 * Obtém o token FCM do dispositivo
 * @returns Promise<string | null> - Token FCM ou null se houver erro
 */
export const getDeviceToken = async (): Promise<string | null> => {
  try {
    if (!isFirebaseConfigured()) {
      console.log('❌ Firebase: não configurado. FCM Token indisponível.');
      return null;
    }

    console.log('🔄 Iniciando processo de obtenção do FCM Token...');

    // iOS requer registro explícito do dispositivo para remote messages
    try {
      console.log('📱 Registrando dispositivo para mensagens remotas...');
      await messaging().registerDeviceForRemoteMessages();
      console.log('✅ Dispositivo registrado para mensagens remotas');
    } catch (err) {
      console.log(
        '⚠️ Firebase: falha ao registrar device para remote messages (pode já estar registrado).',
        err,
      );
    }

    console.log('🔑 Obtendo FCM Token...');
    let token = await messaging().getToken();

    // Retry simples se vier vazio (algumas vezes antes da APNs estar pronta)
    if (!token) {
      console.log('⏳ Firebase: FCM token vazio, tentando novamente em 3s...');
      await new Promise<void>(resolve => setTimeout(() => resolve(), 3000));
      token = await messaging().getToken();
    }

    if (token) {
      console.log('✅✅✅ Firebase: FCM Token gerado com sucesso!');
      console.log('🔑 Token:', token);
    } else {
      console.log('❌ Firebase: FCM Token não foi gerado após tentativas');
    }

    // TODO: Enviar token para seu backend
    // await api.post('/users/fcm-token', { token });

    return token;
  } catch (error) {
    console.error('❌ Firebase: Erro ao obter token FCM:', error);
    return null;
  }
};

/**
 * Handler para mensagens recebidas quando app está em FOREGROUND
 * Retorna função de cleanup para remover listener
 */
export const setupForegroundNotificationHandler = () => {
  if (!isFirebaseConfigured()) {
    console.log('Firebase: não configurado. onMessage não será registrado.');
    return () => {};
  }

  const unsubscribe = messaging().onMessage(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log(
        'Firebase: Mensagem recebida em foreground:',
        JSON.stringify(remoteMessage, null, 2),
      );

      // Dados da mensagem
      const { notification, data } = remoteMessage;

      if (notification) {
        console.log('Firebase: Título:', notification.title);
        console.log('Firebase: Corpo:', notification.body);
      }

      if (data) {
        console.log('Firebase: Data payload:', data);
      }

      // TODO: Adicionar lógica customizada aqui:
      // - Mostrar notificação local
      // - Atualizar Redux store
      // - Tocar som customizado
      // - Vibrar dispositivo
    },
  );

  return unsubscribe;
};

/**
 * Handler para mensagens recebidas quando app está em BACKGROUND ou QUIT
 * Deve ser registrado fora do componente (index.js)
 */
export const setupBackgroundMessageHandler = () => {
  if (!isFirebaseConfigured()) {
    console.log(
      'Firebase: não configurado. setBackgroundMessageHandler não será registrado.',
    );
    return;
  }

  messaging().setBackgroundMessageHandler(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log(
        'Firebase: Mensagem recebida em background:',
        JSON.stringify(remoteMessage, null, 2),
      );

      // TODO: Processar mensagem em background
      // Nota: Não é possível atualizar UI aqui
    },
  );
};

/**
 * Handler para quando usuário TOCA na notificação
 * App estava em background ou fechado
 */
export const setupNotificationOpenedHandler = () => {
  if (!isFirebaseConfigured()) {
    console.log(
      'Firebase: não configurado. Handlers de abertura de notificação não serão registrados.',
    );
    return;
  }
  // App foi aberto pela notificação (estava em background)
  messaging().onNotificationOpenedApp(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log(
        'Firebase: App aberto pela notificação (background):',
        remoteMessage,
      );

      // TODO: Navegar para tela específica baseado em data payload
      // Exemplo: if (remoteMessage.data?.type === 'new_match') navigate('Match')
    },
  );

  // Verifica se app foi aberto por notificação quando estava FECHADO
  messaging()
    .getInitialNotification()
    .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
      if (remoteMessage) {
        console.log(
          'Firebase: App aberto pela notificação (fechado):',
          remoteMessage,
        );

        // TODO: Navegar para tela específica
      }
    });
};

/**
 * Listener para quando o token FCM é atualizado/renovado
 */
export const setupTokenRefreshListener = () => {
  if (!isFirebaseConfigured()) {
    console.log(
      'Firebase: não configurado. onTokenRefresh não será registrado.',
    );
    return () => {};
  }

  const unsubscribe = messaging().onTokenRefresh(async (token: string) => {
    console.log('Firebase: FCM Token atualizado:', token);

    // TODO: Enviar novo token para backend
    // await api.put('/users/fcm-token', { token });
  });

  return unsubscribe;
};

/**
 * Obtém informações do dispositivo (FCM Token e plataforma)
 * @returns Promise com FCM Token e platform
 */
export const getDeviceInfo = async () => {
  try {
    const fcmToken = await getDeviceToken();

    const deviceInfo = {
      fcmToken,
      platform: Platform.OS,
    };

    console.log('Firebase: Device Info:', deviceInfo);
    return deviceInfo;
  } catch (error) {
    console.error('Firebase: Erro ao obter device info:', error);
    return null;
  }
};

/**
 * Deleta o token FCM do dispositivo
 */
export const deleteInstallation = async () => {
  try {
    await messaging().deleteToken();
    console.log('Firebase: Token FCM deletado com sucesso');
  } catch (error) {
    console.error('Firebase: Erro ao deletar token FCM:', error);
  }
};

/**
 * Remove todas as notificações entregues
 */
export const clearAllNotifications = async () => {
  try {
    await messaging().deleteToken();
    console.log('Firebase: Token FCM deletado');
  } catch (error) {
    console.error('Firebase: Erro ao deletar token:', error);
  }
};

/**
 * Inicializa todos os handlers de notificação
 * Chame esta função no App.tsx dentro de useEffect
 * @returns Função de cleanup para remover listeners
 */
export const initializeNotifications = async (): Promise<
  (() => void) | void
> => {
  try {
    // Diagnóstico inicial
    logFirebaseDiagnostics();
    // 1. Solicitar permissão
    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) {
      console.log('Firebase: Sem permissão para notificações');
      return;
    }

    // 1.1 Garantir registro do dispositivo para mensagens remotas (especialmente iOS físico)
    try {
      await messaging().registerDeviceForRemoteMessages();
    } catch {
      console.log(
        'Firebase: dispositivo já registrado ou falha controlada ao registrar remote messages.',
      );
    }

    // 2. Configurar handler para app em foreground
    const unsubscribeForeground = setupForegroundNotificationHandler();

    // 3. Configurar handler para quando usuário toca na notificação
    setupNotificationOpenedHandler();

    // 4. Configurar listener para atualização de token
    const unsubscribeTokenRefresh = setupTokenRefreshListener();

    // Retornar função de cleanup
    return () => {
      unsubscribeForeground();
      unsubscribeTokenRefresh();
    };
  } catch (error) {
    console.error('Firebase: Erro ao inicializar notificações:', error);
  }
};
