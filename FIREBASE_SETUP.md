# 🔥 Firebase Cloud Messaging - Setup Completo

## ✅ O que já foi configurado

### 1. Dependências instaladas
- ✅ `@react-native-firebase/app` (v23.5.0)
- ✅ `@react-native-firebase/messaging` (v23.5.0)
- ✅ CocoaPods instalados com sucesso (iOS)

### 2. Código configurado
- ✅ **Android**: `build.gradle` e `app/build.gradle` com plugin do Google Services
- ✅ **iOS**: `AppDelegate.swift` com Firebase e FCM inicializados
- ✅ **iOS**: `Podfile` com `use_modular_headers!`
- ✅ **Serviço**: `src/services/notifications.ts` criado
- ✅ **App**: `src/App.tsx` inicializa notificações
- ✅ **Background**: `index.js` com handler de mensagens em background

---

## 📋 Próximos Passos Obrigatórios

### 1️⃣ Configurar Firebase Console

1. Acesse: https://console.firebase.google.com/
2. Crie um novo projeto ou selecione existente
3. Vá em **Project Settings** (ícone engrenagem) → **Your apps**

#### iOS:
1. Clique em **Add app** → **iOS**
2. **iOS bundle ID**: `com.petmatch`
3. Baixe o arquivo **`GoogleService-Info.plist`**
4. Coloque em: **`ios/petmatch/GoogleService-Info.plist`**
5. No Xcode, adicione o arquivo ao projeto:
   - Abra `ios/petmatch.xcworkspace` no Xcode
   - Arraste `GoogleService-Info.plist` para a pasta `petmatch`
   - Marque ✅ "Copy items if needed"
   - Marque ✅ Target "petmatch"

#### Android:
1. Clique em **Add app** → **Android**
2. **Android package name**: `com.petmatch`
3. Baixe o arquivo **`google-services.json`**
4. Coloque em: **`android/app/google-services.json`**

```bash
# Exemplo de comando
cp ~/Downloads/google-services.json android/app/
cp ~/Downloads/GoogleService-Info.plist ios/petmatch/
```

### 2️⃣ Habilitar Cloud Messaging no Firebase

1. No Firebase Console, vá em **Build** → **Cloud Messaging**
2. Clique em **Get Started** (se aparecer)
3. Para iOS, adicione APNs:
   - Vá em **Project Settings** → **Cloud Messaging** → **iOS app configuration**
   - Upload APNs Authentication Key (obtenha em developer.apple.com)
   - **OU** use APNs Certificate (método legacy)

---

## 🧪 Testar a Instalação

### Build e executar

```bash
# iOS
yarn ios:simulator

# Android
yarn android
```

### Verificar logs

Ao abrir o app, você deve ver no console:

```
Firebase: Permissão de notificação concedida: authorized
Firebase: FCM Token: eXaMpLe...ToKeN...HeRe
```

**Copie o token FCM** - você vai precisar dele para testar!

### Enviar mensagem de teste

1. Firebase Console → **Cloud Messaging**
2. Clique em **Send test message**
3. Cole o **FCM token** do console
4. Envie a mensagem

**App em foreground**: Você verá logs no console  
**App em background**: Notificação aparece na bandeja  
**App fechado**: Notificação aparece na bandeja

---

## 🔊 Como adicionar o som de latido (opcional)

Se quiser tocar um som customizado quando mensagem chegar:

### 1. Instalar react-native-sound

```bash
yarn add react-native-sound
cd ios && bundle exec pod install
```

### 2. Adicionar arquivo de som

**iOS**:
- Adicione `dog_bark.mp3` em `ios/petmatch/`
- No Xcode, adicione ao Bundle Resources

**Android**:
- Adicione `dog_bark.mp3` em `android/app/src/main/res/raw/`

### 3. Atualizar `src/services/notifications.ts`

```typescript
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const dogBark = new Sound('dog_bark.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Erro ao carregar som:', error);
  }
});

// No setupForegroundNotificationHandler:
export const setupForegroundNotificationHandler = () => {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log('Mensagem recebida:', remoteMessage);
    
    // Tocar som de latido
    dogBark.play((success) => {
      if (!success) dogBark.reset();
    });
  });

  return unsubscribe;
};
```

---

## 🎯 Payload da mensagem (backend)

Quando seu backend enviar notificações, use este formato:

```json
{
  "to": "FCM_TOKEN_DO_USUARIO",
  "notification": {
    "title": "Novo Match! 🐕",
    "body": "Rex quer ser seu amigo!",
    "sound": "default"
  },
  "data": {
    "type": "new_match",
    "petId": "123",
    "petName": "Rex",
    "timestamp": "2025-11-11T12:00:00Z"
  },
  "priority": "high"
}
```

### Enviar via cURL (teste)

```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "FCM_TOKEN_AQUI",
    "notification": {
      "title": "Teste PetMatch",
      "body": "Esta é uma mensagem de teste!"
    },
    "data": {
      "type": "test"
    }
  }'
```

**Server Key**: Firebase Console → Project Settings → Cloud Messaging → Server key

---

## 🔗 Integração com Backend

No `src/services/notifications.ts`, atualize a função `getDeviceToken`:

```typescript
export const getDeviceToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    console.log('Firebase: FCM Token:', token);
    
    // Enviar token para seu backend
    await api.post('/users/fcm-token', { 
      token,
      platform: Platform.OS 
    });
    
    return token;
  } catch (error) {
    console.error('Firebase: Erro ao obter token FCM:', error);
    return null;
  }
};
```

---

## 🚨 Troubleshooting

### iOS não recebe notificações
- ✅ Verifique se `GoogleService-Info.plist` está no Xcode
- ✅ APNs configurado no Firebase Console
- ✅ Permissão de notificação concedida
- ✅ App está registrado para notificações remotas

### Android não recebe notificações
- ✅ Verifique se `google-services.json` está em `android/app/`
- ✅ Plugin `com.google.gms.google-services` aplicado
- ✅ Permissão POST_NOTIFICATIONS (Android 13+)

### Token não aparece no console
- ✅ Verifique internet
- ✅ Verifique arquivos de configuração (plist/json)
- ✅ Limpe cache: `yarn start --reset-cache`
- ✅ Rebuild: `./build_ios_clean.sh` ou `./build_android_clean.sh`

### Notificação não aparece em foreground
- É esperado! Por padrão, notificações em foreground não aparecem
- Customize em `setupForegroundNotificationHandler`
- Ou mostre alert/toast customizado

---

## 📚 Documentação

- React Native Firebase: https://rnfirebase.io/
- FCM Docs: https://firebase.google.com/docs/cloud-messaging
- Sending Messages: https://firebase.google.com/docs/cloud-messaging/send-message

---

## ✅ Checklist Final

Antes de fazer build de produção:

- [ ] `GoogleService-Info.plist` no projeto iOS
- [ ] `google-services.json` no projeto Android
- [ ] APNs configurado no Firebase (iOS)
- [ ] Token FCM sendo enviado para backend
- [ ] Testado em foreground, background e quit
- [ ] Sons/vibrações customizados (se necessário)
- [ ] Navegação quando usuário toca notificação
- [ ] Tratamento de erro quando sem internet
