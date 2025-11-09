# Instruções para Agentes AI - PetMatch

Guia essencial para agentes de IA serem produtivos imediatamente no codebase do PetMatch.

## Arquitetura do Projeto

PetMatch é um app React Native 0.82.1 (React 19.1.1) para matchmaking de pets com geolocalização e navegação em mapas.

### Estrutura de Diretórios

```
src/
  ├── components/ui/        # Componentes Gluestack UI (gerados)
  ├── dtos/                 # TypeScript interfaces e tipos
  ├── hooks/                # useAppDispatch, useAppSelector (tipados)
  ├── pages/
  │   ├── App/             # Login, Register (pré-autenticação)
  │   └── Auth/            # Home, Match, Activity, Profile, Works (pós-auth)
  ├── redux/               # Redux Toolkit (petSlice, homeSlice)
  ├── routes/
  │   ├── AppRoutes/       # Stack navigation (login flow)
  │   └── AuthRoutes/      # Bottom tabs + nested stacks (5 tabs)
  ├── services/            # api.ts (axios) + requests/
  └── ui/                  # Componentes customizados (Button, Input)
```

## Padrões Críticos de Código

### Gerenciamento de Estado

**Redux Toolkit** com slices por domínio:

```typescript
// src/redux/store.ts - combineReducers com petState e homeState
// src/hooks/useRedux.ts - SEMPRE use estes hooks tipados:
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
```

Nunca use `useDispatch` ou `useSelector` direto do react-redux.

### Navegação

Sistema de rotas em duas camadas:

1. **AppRoutes** (não-autenticado): stack navigation para Login/Register
2. **AuthRoutes** (autenticado): bottom tabs com 5 seções, cada uma com nested stacks
   - Veja `src/routes/AuthRoutes/tab.routes.tsx` para estrutura completa
   - Custom tab bar com ícones animados (react-native-reanimated)

**Tipagem de rotas**: Todas as rotas usam `RootTabParamList` e `RootStackParamsList` de `@dtos/routeDTO`.

### Path Aliases (Babel + TypeScript)

Configurado em `babel.config.js` e `tsconfig.json`:

```typescript
import { Component } from '@pages/Auth/HomeScreens/Map';
import { useAppSelector } from '@hooks/useRedux';
import api from '@services/api';
```

Aliases disponíveis: `@/`, `@pages/`, `@ui/`, `@assets/`, `@hooks/`, `@services/`, `@theme/`, `@redux/`, `@dtos/`, `@routes/`

### Estilização (Hybrid Stack)

**Transição em andamento** de UI Kitten para Gluestack UI + NativeWind:

- **Gluestack UI**: Sistema de componentes baseado em `@gluestack-ui/themed` (v1.1.73)
  - Configurado com `@gluestack-ui/config` em `src/App.tsx`
  - Componentes gerados em `src/components/ui/`
- **NativeWind v4**: Tailwind CSS para React Native
  - Configurado em `tailwind.config.js` com cores customizadas
  - Integrado via `global.css`
- **UI Kitten**: Legacy (comentado em App.tsx), mas ainda presente no package.json

**Regra**: Para novos componentes, use Gluestack UI + NativeWind. Evite misturar com UI Kitten.

### Variáveis de Ambiente

```typescript
// @types/env.d.ts define módulo '@env'
import { API_URL, APP_NAME } from '@env';

// babel.config.js: react-native-dotenv carrega .env.{APP_ENV}
// Arquivos: .env.development, .env.production
```

## Integração com Google Maps

**Configuração crítica** em múltiplos arquivos:

### iOS (`ios/petmatch/AppDelegate.swift`)

```swift
GMSServices.provideAPIKey("AIzaSy...")  // Google Maps
GMSPlacesClient.provideAPIKey("AIzaSy...")  // Places API
```

### Android (`android/app/src/main/AndroidManifest.xml`)

```xml
<meta-data android:name="com.google.android.geo.API_KEY"
           android:value="@string/google_maps_key"/>
```

### Uso no Código

```typescript
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

// Ver exemplos: src/pages/Auth/HomeScreens/Map/index.tsx
```

## Fluxo de Desenvolvimento

### Setup Inicial

```bash
yarn install
bundle install         # Ruby gems (CocoaPods)
bundle exec pod install  # iOS nativo
```

### Scripts Essenciais

```bash
yarn start                  # Metro bundler
yarn ios                    # Build iOS padrão
yarn ios:simulator          # iPhone 16 Pro Max (iOS 18.2)
yarn android                # Build Android
yarn test                   # Jest
yarn watchman               # Limpa cache do Watchman
yarn postinstall            # patch-package (automático)
```

### Build Limpo (Scripts Shell)

**iOS** (`./build_ios_clean.sh`):

- Remove node cache, ios/build, metro cache, React temp files
- Limpa Watchman
- Deleta Pods + Podfile.lock
- Roda `pod install`

**Android** (`./build_android_clean.sh`):

- Remove node cache, .gradle, app/build
- Limpa Watchman
- Deleta node_modules, reinstala dependências
- Roda `./gradlew clean`

**Quando usar**: Após mudanças em dependências nativas, erros de build inexplicáveis, ou troca de branch com configs diferentes.

## Configuração de API (src/services/api.ts)

```typescript
// Axios com headers customizados automáticos:
api.defaults.headers.platform = Platform.OS; // 'ios' ou 'android'
api.defaults.headers.remoteId = DeviceInfo.getUniqueIdSync();
api.defaults.headers.deviceName = DeviceInfo.getDeviceNameSync();
api.defaults.headers.appId = DeviceInfo.getBundleId();
```

Todas as requests herdam esses headers. Requisições vão em `src/services/requests/`.

## Debugging e Troubleshooting

### LogBox Ignorado (src/App.tsx)

```typescript
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate`', // Reanimated worklets
  'Failed to open debugger',
  'HeadersTimeoutError',
]);
```

### Problemas Comuns

1. **Metro cache corrupto**: `rm -rf $TMPDIR/metro-cache && yarn start --reset-cache`
2. **iOS build failure**: Rode `./build_ios_clean.sh`
3. **Android Gradle errors**: Rode `./build_android_clean.sh`
4. **Google Maps não aparece**: Verifique API keys em AppDelegate.swift (iOS) ou AndroidManifest.xml (Android)
5. **Import com @ não resolve**: Verifique babel.config.js e tsconfig.json estão sincronizados

## Requisitos de Sistema

- **Node**: >= 20 (engines em package.json)
- **React Native CLI**: 20.0.0
- **iOS**: Xcode 15+, CocoaPods via Bundler
- **Android**: Gradle 8.x, Android SDK 33+

## Notas de Implementação

- **Fast Refresh**: Habilitado, mas force reload se state ficar inconsistente
- **Hermes**: Engine JavaScript padrão (iOS/Android)
- **Swift**: AppDelegate em Swift (não Objective-C)
- **TypeScript strict**: Props tipadas, evite `any`
- **Patches**: Configurado via patch-package (diretório vazio atualmente)
