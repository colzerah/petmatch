# Instruções para Agentes AI no Projeto PetMatch

Este é um guia para ajudar agentes de IA a entender rapidamente a estrutura e padrões do projeto PetMatch.

## Visão Geral da Arquitetura

O PetMatch é um aplicativo React Native com a seguinte estrutura:

```
src/
  ├── assets/        # Recursos estáticos (imagens, etc)
  ├── dtos/         # Definições de tipos e interfaces
  ├── hooks/        # Hooks React personalizados
  ├── pages/        # Componentes de página organizados por fluxo
  │   ├── App/      # Fluxo de autenticação inicial
  │   └── Auth/     # Fluxo principal pós-autenticação
  ├── redux/        # Estado global com Redux
  ├── routes/       # Configuração de navegação
  ├── services/     # Serviços e chamadas API
  ├── theme/        # Estilos e temas
  └── ui/          # Componentes UI reutilizáveis
```

## Principais Padrões e Convenções

### Estado e Gerenciamento de Dados

- Redux é usado para estado global (`src/redux/`)
- DTOs tipados definem as interfaces de dados (`src/dtos/`)
- Hooks personalizados para acesso ao Redux (`src/hooks/useRedux.ts`)

### Navegação

- React Navigation com estrutura de rotas aninhadas
- Fluxos separados para autenticação e área logada
- Navegação por tabs no fluxo autenticado

### Geolocalização e Mapas

- Integração com Google Maps (iOS/Android)
- API de geolocalização nativa (`@react-native-community/geolocation`)
- Chaves de API configuradas em:
  - iOS: `AppDelegate.swift`
  - Android: `android/app/src/main/res/values/google_maps_api.xml`

### UI/UX

- UI Kitten como biblioteca de componentes base
- Componentes customizados em `src/ui/`
- Animações com `react-native-reanimated`

## Fluxos de Desenvolvimento

### Configuração Inicial

```bash
# Instalar dependências
yarn install

# iOS
bundle install
bundle exec pod install

# Android
cd android && ./gradlew clean
```

### Scripts Importantes

```bash
# Desenvolvimento
yarn start      # Inicia o Metro bundler
yarn ios        # Executa no iOS
yarn android    # Executa no Android

# Build limpo
./build_ios_clean.sh     # Limpa e rebuilda iOS
./build_android_clean.sh # Limpa e rebuilda Android
```

### Variáveis de Ambiente

- Definidas em arquivos `.env.*`
- Tipadas em `@types/env.d.ts`
- Acessadas via import de `@env`

## Pontos de Integração

### APIs e Serviços

- Configuração base em `src/services/api.ts`
- Requisições organizadas em `src/services/requests/`

### Dependências Nativas Críticas

- Google Maps/Places
- Geolocation
- React Native Reanimated
- React Native Maps
- Device Info

## Convenções de Código

### Estrutura de Componentes

- Páginas em `src/pages/` seguem estrutura de pastas por domínio
- Componentes reutilizáveis em `src/ui/`
- Cada componente em pasta própria com index.tsx e styles.ts

### TypeScript

- Interfaces em arquivos .d.ts ou DTOs específicos
- Props tipadas explicitamente
- Evitar `any`

### Estado Global

- Slices Redux por domínio em `src/redux/`
- Actions e reducers colocalizados
- Seletores via hooks personalizados

## Notas Adicionais

- Fast Refresh habilitado para desenvolvimento
- Configurações específicas de plataforma em ios/ e android/
- Patches de dependências em patches/
