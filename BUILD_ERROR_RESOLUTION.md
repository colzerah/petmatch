# 🔧 Resolução de Erro de Build - Firebase iOS

## ❌ Problema Identificado

O build está falha com erro no Xcode relacionado à compilação de módulos pré-compilados (`.pcm` files) do Firebase.

**Erro**: `Failed to build ios project. "xcodebuild" exited with error code '65'`

## ✅ O que já foi feito

1. ✅ Build limpo executado (`./build_ios_clean.sh`)
2. ✅ DerivedData e caches do Xcode removidos
3. ✅ Pods reinstalados com sucesso
4. ✅ Xcode workspace aberto: `ios/petmatch.xcworkspace`

## 🎯 Próximos Passos - Build Manual no Xcode

### 1. Verificar Capabilities (CRÍTICO para FCM)

No Xcode que acabou de abrir:

1. **Selecione o target `petmatch`** na barra lateral esquerda
2. Vá para a aba **Signing & Capabilities**
3. Verifique se estas capabilities estão habilitadas:

   #### ✅ Push Notifications
   - Se não estiver, clique em **+ Capability**
   - Procure e adicione **Push Notifications**

   #### ✅ Background Modes
   - Se não estiver, clique em **+ Capability**
   - Procure e adicione **Background Modes**
   - Marque: ☑️ **Remote notifications**

### 2. Build Direto no Xcode

Com o Xcode aberto:

1. Selecione o **scheme**: `petmatch` (topo da tela, ao lado do botão de play)
2. Selecione o **dispositivo**: `iPhone 16 Pro Max` (ou qualquer simulador)
3. Pressione **⌘ + B** (Command + B) para fazer build
4. **OU** clique no botão **▶︎** (Play) para build e executar

### 3. Se o Build Falhar no Xcode

#### Opção A: Limpar Build Folder
1. No Xcode: **Product** > **Clean Build Folder** (⌘ + Shift + K)
2. Aguardar conclusão
3. Tentar build novamente (⌘ + B)

#### Opção B: Rebuild Pods dentro do Xcode
1. No Xcode, menu: **Product** > **Scheme** > **Manage Schemes...**
2. Desmarcar **Pods-petmatch** (se estiver marcado)
3. Fechar e tentar build novamente

#### Opção C: Verificar versão do Xcode
```bash
xcodebuild -version
```

Versão recomendada: **Xcode 15.0+**

Se estiver usando Xcode 16 Beta, pode haver incompatibilidades. Considere usar Xcode 15.

### 4. Build via Terminal (Alternativa)

Se preferir tentar via terminal novamente:

```bash
cd /Users/dyegolima/projects/pet/petmatch

# Limpar tudo
xcodebuild clean -workspace ios/petmatch.xcworkspace -scheme petmatch

# Build para simulador específico
xcodebuild \
  -workspace ios/petmatch.xcworkspace \
  -scheme petmatch \
  -configuration Debug \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 16 Pro Max,OS=18.2' \
  build
```

## 🔍 Diagnóstico Adicional

### Verificar Módulos Problemáticos

O erro estava relacionado a:
- `FirebaseInstallations`
- Módulos de sistema (`_string`, `_time`, `sys_wait`, etc.)

Isso geralmente indica:
1. **Cache de módulos corrompido** (já foi limpo ✅)
2. **Conflito de versão do Xcode/SDK**
3. **Permissões de arquivo**

### Verificar Permissões

```bash
# Dar permissões corretas aos arquivos
cd /Users/dyegolima/projects/pet/petmatch/ios
sudo chown -R $(whoami) .
```

### Último Recurso: Downgrade do Firebase

Se nada funcionar, podemos tentar versão anterior do Firebase:

```bash
cd /Users/dyegolima/projects/pet/petmatch

# Editar package.json
# Trocar:
# "@react-native-firebase/app": "^23.5.0"
# "@react-native-firebase/messaging": "^23.5.0"
# 
# Por:
# "@react-native-firebase/app": "19.2.2"
# "@react-native-firebase/messaging": "19.2.2"

yarn install
cd ios
bundle exec pod install
cd ..
./build_ios_clean.sh
```

## 🎬 Ação Imediata

**NO XCODE QUE ACABOU DE ABRIR:**

1. ✅ Verificar Signing & Capabilities (Push Notifications + Background Modes)
2. ✅ Fazer Clean Build Folder (⌘ + Shift + K)
3. ✅ Tentar Build (⌘ + B)
4. ✅ Observar se há erros diferentes ou se compila

**Aguarde o build terminar** e reporte:
- ✅ Se compilou com sucesso
- ❌ Se falhou, qual é a primeira mensagem de erro vermelha no Xcode

## 📋 Checklist de Troubleshooting

- [x] Build limpo executado
- [x] DerivedData removido
- [x] Pods reinstalados
- [x] Xcode aberto
- [ ] Capabilities verificadas (FAZER AGORA)
- [ ] Build no Xcode tentado (FAZER AGORA)

## 💡 Dica

O erro de "module compilation" geralmente é resolvido com:
1. **Clean Build Folder no Xcode** (⌘ + Shift + K)
2. **Restart do Mac** (em casos extremos)
3. **Build direto no Xcode** ao invés do terminal

---

**Status**: Aguardando build manual no Xcode.

**Próximo passo**: Verificar Capabilities e tentar build (⌘ + B).
