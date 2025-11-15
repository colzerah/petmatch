# Backend Integration - Firebase Cloud Messaging

Exemplos de integração do FCM com diferentes backends para enviar notificações push no PetMatch.

## 🔑 Configuração Inicial

### 1. Obter Server Key do Firebase

1. Acesse: https://console.firebase.google.com/project/petmatch-f0440/settings/cloudmessaging
2. Na aba **Cloud Messaging API (Legacy)**
3. Copie o **Server key**

> ⚠️ **Importante**: Nunca commitar o Server Key no código! Use variáveis de ambiente.

### 2. Obter Service Account (Método Moderno - Recomendado)

1. Firebase Console > Project Settings > Service Accounts
2. Clique em **Generate new private key**
3. Salve o arquivo JSON (ex: `petmatch-firebase-adminsdk.json`)
4. Use o Firebase Admin SDK

## 📡 Backend Node.js/Express

### Instalação

```bash
npm install firebase-admin
```

### Configuração (Express)

```javascript
// src/config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../petmatch-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'petmatch-f0440',
});

const messaging = admin.messaging();

module.exports = { admin, messaging };
```

### Endpoint para Salvar FCM Token

```javascript
// src/routes/users.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');

// POST /api/users/fcm-token
router.post('/fcm-token', async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user.id; // do middleware de autenticação

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Salvar token no banco
    await User.update(
      { fcmToken: token },
      { where: { id: userId } }
    );

    res.json({ success: true, message: 'FCM token saved' });
  } catch (error) {
    console.error('Error saving FCM token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

### Enviar Notificação Individual

```javascript
// src/services/notificationService.js
const { messaging } = require('../config/firebase');

/**
 * Envia notificação para um único dispositivo
 */
async function sendNotificationToDevice(fcmToken, title, body, data = {}) {
  const message = {
    token: fcmToken,
    notification: {
      title,
      body,
    },
    data, // Payload customizado
    apns: {
      payload: {
        aps: {
          sound: 'default',
          badge: 1,
        },
      },
    },
    android: {
      notification: {
        sound: 'default',
        channelId: 'default',
      },
    },
  };

  try {
    const response = await messaging.send(message);
    console.log('Notification sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
}

module.exports = { sendNotificationToDevice };
```

### Enviar para Múltiplos Dispositivos

```javascript
/**
 * Envia notificação para múltiplos dispositivos
 */
async function sendNotificationToMultipleDevices(
  fcmTokens,
  title,
  body,
  data = {}
) {
  const message = {
    tokens: fcmTokens, // Array de tokens
    notification: {
      title,
      body,
    },
    data,
    apns: {
      payload: {
        aps: {
          sound: 'default',
        },
      },
    },
  };

  try {
    const response = await messaging.sendEachForMulticast(message);
    console.log(`${response.successCount} notifications sent successfully`);
    
    // Tratar falhas
    if (response.failureCount > 0) {
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          console.error(`Failed to send to token ${fcmTokens[idx]}:`, resp.error);
        }
      });
    }
    
    return response;
  } catch (error) {
    console.error('Error sending multicast notification:', error);
    throw error;
  }
}
```

### Notificar Novo Match

```javascript
// src/services/matchService.js
const { sendNotificationToDevice } = require('./notificationService');
const { User, Match } = require('../models');

async function notifyNewMatch(matchId) {
  const match = await Match.findByPk(matchId, {
    include: [
      { model: User, as: 'user1' },
      { model: User, as: 'user2' },
    ],
  });

  const { user1, user2 } = match;

  // Notificar user1
  if (user1.fcmToken) {
    await sendNotificationToDevice(
      user1.fcmToken,
      'Novo Match! 🐾',
      `Você deu match com ${user2.name}`,
      {
        type: 'new_match',
        matchId: matchId.toString(),
        petId: user2.petId.toString(),
      }
    );
  }

  // Notificar user2
  if (user2.fcmToken) {
    await sendNotificationToDevice(
      user2.fcmToken,
      'Novo Match! 🐾',
      `Você deu match com ${user1.name}`,
      {
        type: 'new_match',
        matchId: matchId.toString(),
        petId: user1.petId.toString(),
      }
    );
  }
}

module.exports = { notifyNewMatch };
```

### Usar no Controller

```javascript
// src/controllers/matchController.js
const { notifyNewMatch } = require('../services/matchService');

async function createMatch(req, res) {
  try {
    const { user1Id, user2Id } = req.body;
    
    const match = await Match.create({
      user1Id,
      user2Id,
      status: 'active',
    });

    // Enviar notificações push
    await notifyNewMatch(match.id);

    res.status(201).json({ match });
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

## 🐍 Backend Python/Django

### Instalação

```bash
pip install firebase-admin
```

### Configuração

```python
# config/firebase.py
import firebase_admin
from firebase_admin import credentials, messaging
import os

cred = credentials.Certificate('path/to/petmatch-firebase-adminsdk.json')
firebase_admin.initialize_app(cred)

def send_notification(fcm_token, title, body, data=None):
    """Envia notificação para um dispositivo"""
    message = messaging.Message(
        token=fcm_token,
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
        data=data or {},
        apns=messaging.APNSConfig(
            payload=messaging.APNSPayload(
                aps=messaging.Aps(
                    sound='default',
                    badge=1,
                ),
            ),
        ),
        android=messaging.AndroidConfig(
            notification=messaging.AndroidNotification(
                sound='default',
                channel_id='default',
            ),
        ),
    )
    
    try:
        response = messaging.send(message)
        print(f'Notification sent successfully: {response}')
        return response
    except Exception as e:
        print(f'Error sending notification: {e}')
        raise
```

### View para Salvar Token

```python
# views/user_views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_fcm_token(request):
    """Salva o FCM token do usuário"""
    token = request.data.get('token')
    
    if not token:
        return Response(
            {'error': 'Token is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = request.user
    user.fcm_token = token
    user.save()
    
    return Response({'success': True, 'message': 'FCM token saved'})
```

### Signal para Notificar Match

```python
# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Match
from config.firebase import send_notification

@receiver(post_save, sender=Match)
def notify_new_match(sender, instance, created, **kwargs):
    """Envia notificações quando um novo match é criado"""
    if created:
        match = instance
        
        # Notificar user1
        if match.user1.fcm_token:
            send_notification(
                match.user1.fcm_token,
                'Novo Match! 🐾',
                f'Você deu match com {match.user2.name}',
                {
                    'type': 'new_match',
                    'matchId': str(match.id),
                    'petId': str(match.user2.pet_id),
                }
            )
        
        # Notificar user2
        if match.user2.fcm_token:
            send_notification(
                match.user2.fcm_token,
                'Novo Match! 🐾',
                f'Você deu match com {match.user1.name}',
                {
                    'type': 'new_match',
                    'matchId': str(match.id),
                    'petId': str(match.user1.pet_id),
                }
            )
```

## ☕ Backend Java/Spring Boot

### Dependência (Maven)

```xml
<dependency>
    <groupId>com.google.firebase</groupId>
    <artifactId>firebase-admin</artifactId>
    <version>9.2.0</version>
</dependency>
```

### Configuração

```java
// config/FirebaseConfig.java
package com.petmatch.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Configuration
public class FirebaseConfig {
    
    @PostConstruct
    public void initialize() {
        try {
            FileInputStream serviceAccount = 
                new FileInputStream("src/main/resources/petmatch-firebase-adminsdk.json");
            
            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();
            
            FirebaseApp.initializeApp(options);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### Service

```java
// service/NotificationService.java
package com.petmatch.service;

import com.google.firebase.messaging.*;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class NotificationService {
    
    public String sendNotification(String fcmToken, String title, String body, Map<String, String> data) {
        Message message = Message.builder()
            .setToken(fcmToken)
            .setNotification(Notification.builder()
                .setTitle(title)
                .setBody(body)
                .build())
            .putAllData(data)
            .setApnsConfig(ApnsConfig.builder()
                .setAps(Aps.builder()
                    .setSound("default")
                    .setBadge(1)
                    .build())
                .build())
            .setAndroidConfig(AndroidConfig.builder()
                .setNotification(AndroidNotification.builder()
                    .setSound("default")
                    .setChannelId("default")
                    .build())
                .build())
            .build();
        
        try {
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Notification sent successfully: " + response);
            return response;
        } catch (FirebaseMessagingException e) {
            System.err.println("Error sending notification: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
```

## 🔴 Backend PHP/Laravel

### Instalação

```bash
composer require kreait/firebase-php
```

### Configuração

```php
// config/firebase.php
return [
    'credentials' => storage_path('app/petmatch-firebase-adminsdk.json'),
    'project_id' => 'petmatch-f0440',
];
```

### Service

```php
// app/Services/NotificationService.php
<?php

namespace App\Services;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class NotificationService
{
    protected $messaging;
    
    public function __construct()
    {
        $factory = (new Factory)->withServiceAccount(config('firebase.credentials'));
        $this->messaging = $factory->createMessaging();
    }
    
    public function sendNotification($fcmToken, $title, $body, $data = [])
    {
        $message = CloudMessage::withTarget('token', $fcmToken)
            ->withNotification(Notification::create($title, $body))
            ->withData($data);
        
        try {
            $response = $this->messaging->send($message);
            \Log::info('Notification sent successfully', ['response' => $response]);
            return $response;
        } catch (\Exception $e) {
            \Log::error('Error sending notification: ' . $e->getMessage());
            throw $e;
        }
    }
}
```

### Controller

```php
// app/Http/Controllers/UserController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function saveFcmToken(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);
        
        $user = $request->user();
        $user->fcm_token = $request->token;
        $user->save();
        
        return response()->json([
            'success' => true,
            'message' => 'FCM token saved',
        ]);
    }
}
```

## 📋 Modelo de Banco de Dados

### SQL

```sql
-- Adicionar coluna fcm_token na tabela users
ALTER TABLE users ADD COLUMN fcm_token VARCHAR(255);

-- Índice para busca rápida
CREATE INDEX idx_users_fcm_token ON users(fcm_token);
```

### Sequelize (Node.js)

```javascript
// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fcmToken: {
      type: DataTypes.STRING,
      field: 'fcm_token',
    },
    // ... outros campos
  });
  
  return User;
};
```

## 🎯 Tipos de Notificações no PetMatch

### 1. Novo Match

```javascript
{
  type: 'new_match',
  matchId: '123',
  petId: '456',
  petName: 'Rex',
  petPhoto: 'https://...'
}
```

### 2. Nova Mensagem

```javascript
{
  type: 'new_message',
  matchId: '123',
  senderId: '789',
  senderName: 'João',
  message: 'Olá! Tudo bem?'
}
```

### 3. Lembrete de Proximidade

```javascript
{
  type: 'nearby_pet',
  petId: '456',
  petName: 'Bella',
  distance: '500m'
}
```

### 4. Convite para Encontro

```javascript
{
  type: 'meetup_invitation',
  matchId: '123',
  meetupId: '999',
  location: 'Parque Central',
  datetime: '2025-11-15T15:00:00Z'
}
```

## 🔐 Segurança

### Variáveis de Ambiente

```bash
# .env
FIREBASE_PROJECT_ID=petmatch-f0440
FIREBASE_SERVICE_ACCOUNT_PATH=/path/to/petmatch-firebase-adminsdk.json
```

### Não Fazer

❌ Commitar service account JSON no Git
❌ Expor Server Key no frontend
❌ Enviar notificações sem validação
❌ Armazenar tokens sem criptografia

### Fazer

✅ Usar variáveis de ambiente
✅ Validar FCM tokens antes de enviar
✅ Implementar rate limiting
✅ Logs de auditoria
✅ Tratar tokens expirados/inválidos

## 📊 Monitoramento

### Tratar Tokens Inválidos

```javascript
async function cleanupInvalidTokens(fcmTokens) {
  const message = { tokens: fcmTokens, /* ... */ };
  const response = await messaging.sendEachForMulticast(message);
  
  const failedTokens = [];
  response.responses.forEach((resp, idx) => {
    if (!resp.success) {
      const error = resp.error;
      
      // Token expirado ou inválido
      if (
        error.code === 'messaging/invalid-registration-token' ||
        error.code === 'messaging/registration-token-not-registered'
      ) {
        failedTokens.push(fcmTokens[idx]);
      }
    }
  });
  
  // Remover tokens inválidos do banco
  if (failedTokens.length > 0) {
    await User.update(
      { fcmToken: null },
      { where: { fcmToken: { [Op.in]: failedTokens } } }
    );
  }
}
```

## 🧪 Teste Local com cURL

```bash
# Usando Server Key (Legacy)
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=SEU_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "FCM_TOKEN",
    "notification": {
      "title": "Teste PetMatch",
      "body": "Novo match disponível!"
    },
    "data": {
      "type": "new_match",
      "matchId": "123"
    }
  }'
```

## 📚 Referências

- [Firebase Admin SDK - Node.js](https://firebase.google.com/docs/admin/setup)
- [FCM HTTP v1 API](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages)
- [Firebase Admin - Python](https://firebase.google.com/docs/reference/admin/python)
- [Firebase Admin - Java](https://firebase.google.com/docs/admin/setup#java)
