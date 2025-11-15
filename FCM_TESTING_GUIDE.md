# Guia de Testes - Firebase Cloud Messaging (FCM)

## ✅ Instalação Completa

O Firebase Cloud Messaging está totalmente configurado no PetMatch com:

- ✅ Dependências instaladas (`@react-native-firebase/app` e `@react-native-firebase/messaging`)
- ✅ Configuração iOS (`GoogleService-Info.plist`)
- ✅ Configuração Android (`google-services.json`)
- ✅ Service notifications implementado (`src/services/notifications.ts`)
- ✅ Inicialização no App.tsx
- ✅ Background handler no index.js
- ✅ Build limpo realizado

## 🔍 Verificação da Instalação

### 1. Verificar FCM Token no Console

Ao iniciar o app, você deverá ver nos logs:

```
[FirebaseDiag] isConfigured: true
[FirebaseDiag] App name: [DEFAULT]
Firebase: Permissão de notificação concedida: 1
Firebase: FCM Token: [seu-token-aqui]
```

### 2. Verificar Permissões

O app automaticamente:
- Solicita permissão de notificações no iOS
- Registra o dispositivo para remote messages
- Obtém e loga o FCM token

## 🧪 Testando Notificações

### Método 1: Firebase Console (Mais Fácil)

1. Acesse: https://console.firebase.google.com/
2. Selecione o projeto: `petmatch-f0440`
3. Vá em **Messaging** > **Cloud Messaging**
4. Clique em **New Campaign** > **Firebase Notification messages**
5. Configure:
   - **Título**: "Teste PetMatch"
   - **Texto**: "Notificação de teste funcionando!"
6. Clique em **Next**
7. Selecione **iOS app** (`com.petmatch`)
8. Clique em **Next** até **Review** e envie

### Método 2: cURL (Mais Técnico)

```bash
# 1. Obtenha o FCM Token dos logs do app
# 2. Obtenha o Server Key do Firebase Console:
#    Settings > Cloud Messaging > Server Key

curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=SEU_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "SEU_FCM_TOKEN",
    "notification": {
      "title": "Teste PetMatch",
      "body": "Notificação enviada via cURL"
    },
    "data": {
      "type": "test",
      "matchId": "123"
    }
  }'
```

### Método 3: Postman/Insomnia

**URL**: `https://fcm.googleapis.com/fcm/send`

**Headers**:
```
Authorization: key=SEU_SERVER_KEY
Content-Type: application/json
```

**Body (JSON)**:
```json
{
  "to": "SEU_FCM_TOKEN",
  "notification": {
    "title": "Novo Match! 🐾",
    "body": "Você tem um novo match com Rex"
  },
  "data": {
    "type": "new_match",
    "petId": "pet123",
    "matchId": "match456"
  }
}
```

## 📱 Cenários de Teste

### Teste 1: App em Foreground
1. Abra o app
2. Envie notificação
3. **Resultado esperado**: Log no console com `Firebase: Mensagem recebida em foreground:`

### Teste 2: App em Background
1. Abra o app, minimize (Home button)
2. Envie notificação
3. **Resultado esperado**: Banner de notificação aparece

### Teste 3: App Fechado
1. Force quit do app (swipe up no switcher)
2. Envie notificação
3. **Resultado esperado**: Notificação aparece na tela de bloqueio

### Teste 4: Tocar na Notificação
1. Com app em background, envie notificação
2. Toque na notificação
3. **Resultado esperado**: App abre e log `Firebase: App aberto pela notificação (background):`

## 🔧 Logs Importantes

### Inicialização
```typescript
[FirebaseDiag] isConfigured: true
Firebase: Permissão de notificação concedida: 1
Firebase: FCM Token: [token]
```

### Foreground Message
```typescript
Firebase: Mensagem recebida em foreground:
{
  "notification": {
    "title": "Teste",
    "body": "Mensagem"
  },
  "data": { ... }
}
```

### Background Message
```typescript
Firebase: Mensagem recebida em background: [objeto]
```

### Notificação Abriu App
```typescript
Firebase: App aberto pela notificação (background): [objeto]
```

### Token Atualizado
```typescript
Firebase: FCM Token atualizado: [novo-token]
```

## 🐛 Troubleshooting

### Problema: "Firebase: não configurado"
**Solução**: 
- Verifique se `GoogleService-Info.plist` está em `ios/petmatch/`
- Rode `./build_ios_clean.sh` novamente

### Problema: FCM Token vazio
**Solução**:
- iOS: Verifique capabilities no Xcode (Push Notifications e Background Modes)
- Teste em dispositivo físico (simulador tem limitações)

### Problema: Notificação não aparece em foreground
**Comportamento esperado**: Em foreground, iOS não mostra banner automaticamente. Você precisa implementar notificação local customizada ou usar biblioteca como `@notifee/react-native`.

### Problema: Permissão negada
**Solução**: 
- iOS: Settings > [App] > Notifications > Allow
- Desinstale e reinstale o app para pedir permissão novamente

## 📝 Próximos Passos

### 1. Implementar Notificações Locais em Foreground
```bash
yarn add @notifee/react-native
```

### 2. Enviar Token para Backend
Descomente em `src/services/notifications.ts`:
```typescript
// TODO: Enviar token para seu backend
await api.post('/users/fcm-token', { token });
```

### 3. Implementar Navegação por Data Payload
No handler `onNotificationOpenedApp`:
```typescript
if (remoteMessage.data?.type === 'new_match') {
  navigation.navigate('Match', { matchId: remoteMessage.data.matchId });
}
```

### 4. Adicionar Badge Count
```typescript
import notifee from '@notifee/react-native';

// Atualizar badge
await notifee.setBadgeCount(newCount);
```

### 5. Implementar Notificações Agendadas
```typescript
import notifee, { TimestampTrigger } from '@notifee/react-native';

const trigger: TimestampTrigger = {
  type: TriggerType.TIMESTAMP,
  timestamp: Date.now() + 60000, // 1 minuto
};

await notifee.createTriggerNotification(
  {
    title: 'Lembrete',
    body: 'Você tem matches pendentes!',
  },
  trigger,
);
```

## 📚 Referências

- [Firebase Cloud Messaging Docs](https://rnfirebase.io/messaging/usage)
- [Firebase Console](https://console.firebase.google.com/)
- [Notifee (Local Notifications)](https://notifee.app/)
- [Push Notification Best Practices](https://developer.apple.com/documentation/usernotifications)

## 🎯 Status da Implementação

- ✅ Configuração básica do FCM
- ✅ Permissões e FCM Token
- ✅ Handler de mensagens (foreground, background, quit)
- ✅ Handler de notificação aberta
- ✅ Listener de atualização de token
- ⏳ Notificações locais em foreground (TODO)
- ⏳ Integração com backend (TODO)
- ⏳ Navegação baseada em data payload (TODO)
- ⏳ Badge count (TODO)

---

**Nota**: Para testes completos de notificações push, é recomendado usar um **dispositivo físico iOS** ao invés do simulador, pois o simulador tem limitações com APNs (Apple Push Notification service).
