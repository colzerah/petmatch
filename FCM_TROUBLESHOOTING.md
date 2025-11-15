# Troubleshooting - Firebase Cloud Messaging

## 🚨 Problemas Comuns e Soluções

### 1. "Firebase: não configurado" nos logs

**Causa**: Arquivos de configuração do Firebase não foram encontrados pelo app nativo.

**Solução iOS**:
```bash
# Verificar se o arquivo existe
ls -la ios/petmatch/GoogleService-Info.plist

# Se não existir, baixar do Firebase Console:
# https://console.firebase.google.com/project/petmatch-f0440/settings/general/ios:com.petmatch

# Depois de adicionar o arquivo, rodar:
./build_ios_clean.sh
yarn ios:simulator
```

**Solução Android**:
```bash
# Verificar se o arquivo existe
ls -la android/app/google-services.json

# Se não existir, baixar do Firebase Console:
# https://console.firebase.google.com/project/petmatch-f0440/settings/general/android:com.petmatch

# Depois de adicionar o arquivo, rodar:
./build_android_clean.sh
yarn android
```

### 2. FCM Token vazio ou null

**Logs**:
```
Firebase: FCM Token: null
```

**Causas possíveis**:
1. Simulador iOS (APNs não funciona 100% em simuladores)
2. Permissão de notificação negada
3. Firebase não inicializado corretamente
4. Sem conexão com internet

**Solução**:
```bash
# 1. Testar em dispositivo físico
yarn ios --device

# 2. Verificar permissões no iOS
# Settings > [App] > Notifications > verificar se está habilitado

# 3. Force quit do app e abrir novamente
# 4. Verificar internet
# 5. Aguardar alguns segundos (retry automático implementado)
```

### 3. "app/no-app: No Firebase App '[DEFAULT]' has been created"

**Causa**: Firebase não foi inicializado antes de tentar usar o Messaging.

**Solução**: Já está implementada! O service `notifications.ts` verifica se o Firebase está configurado antes de usar:

```typescript
const isFirebaseConfigured = (): boolean => {
  try {
    firebase.app();
    return true;
  } catch {
    return false;
  }
};
```

Se ainda assim ocorrer o erro, verifique se `GoogleService-Info.plist` está no Xcode project:
1. Abra `ios/petmatch.xcworkspace` no Xcode
2. Verifique se `GoogleService-Info.plist` está na pasta `petmatch`
3. Se não estiver, arraste o arquivo para lá
4. Limpe e reconstrua: `./build_ios_clean.sh`

### 4. Notificação não aparece quando app está em foreground

**Comportamento esperado**: No iOS, quando o app está em foreground, o banner de notificação **NÃO aparece automaticamente**.

**Solução**: Implementar notificação local usando `@notifee/react-native`:

```bash
yarn add @notifee/react-native
cd ios && bundle exec pod install && cd ..
```

Depois, atualizar `setupForegroundNotificationHandler` em `src/services/notifications.ts`:

```typescript
import notifee from '@notifee/react-native';

export const setupForegroundNotificationHandler = () => {
  // ... código existente ...
  
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    const { notification } = remoteMessage;
    
    // Mostrar notificação local
    await notifee.displayNotification({
      title: notification?.title || 'Nova mensagem',
      body: notification?.body || '',
      ios: {
        sound: 'default',
      },
    });
  });
  
  return unsubscribe;
};
```

### 5. "Error: You attempted to use a firebase module that's not installed"

**Causa**: Módulo nativo do Firebase não foi linkado corretamente.

**Solução iOS**:
```bash
./build_ios_clean.sh
```

**Solução Android**:
```bash
./build_android_clean.sh
```

Se persistir:
```bash
# Limpar tudo
rm -rf node_modules
rm -rf ios/Pods ios/build
rm -rf android/.gradle android/app/build
yarn install
cd ios && bundle exec pod install && cd ..
```

### 6. Xcode Build Failed - "No such module 'Firebase'"

**Causa**: Pods não foram instalados corretamente.

**Solução**:
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
yarn ios:simulator
```

### 7. Android: "Default FirebaseApp is not initialized"

**Causa**: Plugin `com.google.gms.google-services` não está aplicado ou `google-services.json` está no lugar errado.

**Verificar**:
```bash
# 1. Arquivo no lugar certo
ls -la android/app/google-services.json

# 2. Plugin aplicado no build.gradle
grep "google-services" android/app/build.gradle
# Deve mostrar: apply plugin: 'com.google.gms.google-services'
```

**Solução**:
```bash
./build_android_clean.sh
yarn android
```

### 8. "Sending `onAnimatedValueUpdate` with no listeners registered"

**Ignorar**: Já está sendo ignorado no `LogBox` em `src/App.tsx`. Não afeta FCM.

### 9. Token atualiza mas não recebo notificações

**Verificar**:
1. **Server Key correto**: Firebase Console > Project Settings > Cloud Messaging > Server key
2. **Bundle ID correto no request**: Deve ser `com.petmatch`
3. **Token válido**: Copiar novamente dos logs (token pode expirar)
4. **APNs certificates**: iOS requer certificados configurados (já deve estar OK se você recebe o token)

**Testar com cURL**:
```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=SEU_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "SEU_FCM_TOKEN",
    "notification": {
      "title": "Teste",
      "body": "Debug"
    }
  }'

# Resposta esperada:
# {"multicast_id":...,"success":1,"failure":0,...}
```

### 10. iOS: Permissão negada permanentemente

**Problema**: Usuário negou permissão e agora não consegue habilitar pelo app.

**Solução**:
```
1. Deletar o app do dispositivo/simulador
2. Settings > General > iPhone Storage > [App] > Delete App
3. Reinstalar: yarn ios:simulator
4. Aceitar permissão quando solicitada
```

**OU** habilitar manualmente:
```
Settings > [App Name] > Notifications > Allow Notifications
```

### 11. Background handler não executa

**Verificar iOS**:
1. Abrir Xcode: `ios/petmatch.xcworkspace`
2. Selecionar target `petmatch`
3. Aba **Signing & Capabilities**
4. Verificar **Background Modes** habilitado com:
   - ☑️ Remote notifications

**Se não estiver**:
1. Clicar em `+ Capability`
2. Adicionar **Background Modes**
3. Marcar **Remote notifications**
4. Rebuild: `yarn ios:simulator`

### 12. Logs de diagnóstico não aparecem

**Causa**: `logFirebaseDiagnostics()` não está sendo chamado.

**Verificar**: Em `src/services/notifications.ts`, a função `initializeNotifications()` chama `logFirebaseDiagnostics()` na primeira linha:

```typescript
export const initializeNotifications = async () => {
  try {
    logFirebaseDiagnostics(); // <-- Deve estar aqui
    // ...
  }
}
```

**E** em `src/App.tsx`:
```typescript
useEffect(() => {
  let cleanup: (() => void) | undefined;

  initializeNotifications().then(unsubscribe => {
    if (typeof unsubscribe === 'function') {
      cleanup = unsubscribe;
    }
  });

  return () => {
    if (cleanup) {
      cleanup();
    }
  };
}, []);
```

## 🔍 Comandos de Diagnóstico

### Verificar instalação do Firebase

```bash
# Verificar se módulos estão instalados
ls -la node_modules/@react-native-firebase/

# Verificar versões
grep "@react-native-firebase" package.json

# iOS: Verificar Pods instalados
grep "Firebase" ios/Podfile.lock

# Android: Verificar plugins
grep "google-services" android/build.gradle
grep "google-services" android/app/build.gradle
```

### Limpar cache completo

```bash
# Metro
rm -rf $TMPDIR/metro-cache
yarn start --reset-cache

# Watchman
watchman watch-del-all

# iOS
rm -rf ios/build ios/Pods ~/Library/Developer/Xcode/DerivedData

# Android
cd android && ./gradlew clean && cd ..
rm -rf android/.gradle android/app/build

# Node modules
rm -rf node_modules
yarn install
```

### Verificar configuração do Firebase

```bash
# iOS: Verificar GOOGLE_APP_ID
/usr/libexec/PlistBuddy -c "Print :GOOGLE_APP_ID" ios/petmatch/GoogleService-Info.plist

# Android: Verificar mobilesdk_app_id
grep "mobilesdk_app_id" android/app/google-services.json
```

## 📱 Testando em Dispositivo Físico

Para testes completos de push notifications, use um **dispositivo físico**:

### iOS
```bash
# Conectar iPhone via cabo
# Verificar dispositivo
xcrun xctrace list devices

# Rodar no dispositivo
yarn ios --device "Nome do iPhone"
```

### Android
```bash
# Habilitar USB Debugging no Android
# Settings > Developer Options > USB Debugging

# Verificar dispositivo conectado
adb devices

# Rodar no dispositivo
yarn android
```

## 🎯 Checklist de Verificação

Antes de reportar um problema, verificar:

- [ ] `GoogleService-Info.plist` existe em `ios/petmatch/`
- [ ] `google-services.json` existe em `android/app/`
- [ ] Build limpo executado (`./build_ios_clean.sh` ou `./build_android_clean.sh`)
- [ ] Permissão de notificações concedida no dispositivo
- [ ] Internet conectada
- [ ] Firebase Console mostra o app registrado
- [ ] Logs de diagnóstico aparecem no console (`[FirebaseDiag]`)
- [ ] FCM Token é gerado (não null)
- [ ] Background Modes habilitado no Xcode (iOS)
- [ ] Testando em dispositivo físico (não simulador)

## 📞 Suporte

Se o problema persistir após seguir todos os passos:

1. **Verificar logs completos**: Console do Metro e Xcode/Logcat
2. **Firebase Status**: https://status.firebase.google.com/
3. **Documentação oficial**: https://rnfirebase.io/
4. **GitHub Issues**: https://github.com/invertase/react-native-firebase/issues

## 🆘 Comandos de Emergência

Se nada funcionar, **reset completo**:

```bash
#!/bin/bash
# reset_fcm.sh

echo "🚨 RESET COMPLETO DO FIREBASE"

# Parar Metro
killall node

# Limpar tudo
rm -rf node_modules
rm -rf ios/Pods ios/Podfile.lock ios/build
rm -rf android/.gradle android/app/build
rm -rf $TMPDIR/metro-cache
rm -rf $TMPDIR/react-*

# Watchman
watchman watch-del-all

# Reinstalar
yarn install
cd ios && bundle install && bundle exec pod install && cd ..

# Rebuild
yarn start --reset-cache &
sleep 5
yarn ios:simulator
```

Salvar como `reset_fcm.sh`, dar permissão e executar:
```bash
chmod +x reset_fcm.sh
./reset_fcm.sh
```
