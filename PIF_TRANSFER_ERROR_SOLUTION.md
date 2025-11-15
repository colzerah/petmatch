# Solução: Build Service Error - PIF Transfer Session

## ❌ Erro Encontrado

```
Build service could not create build operation: unknown error while handling message: 
MsgHandlingError(message: "unable to initiate PIF transfer session (operation in progress?)")
```

## 🔍 Causa

Este erro ocorre quando:
1. O Xcode tem uma operação de build travada/em andamento
2. Existe um processo `xcodebuild` zombie (não finalizado corretamente)
3. Arquivos de lock/cache estão corrompidos
4. Múltiplas tentativas de build simultâneas

## ✅ Solução Aplicada

### Passo 1: Matar Processos Travados

```bash
killall Xcode
killall Simulator
killall xcodebuild
```

### Passo 2: Limpar Caches

```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ios/build
rm -rf ios/.xcode.env.local
```

### Passo 3: Tentar Build Novamente

```bash
yarn ios:simulator
```

## 🛠️ Outras Soluções

### Solução A: Restart do Xcode Build Service

```bash
# Matar o serviço de build do Xcode
sudo pkill -9 -f "com.apple.dt.XCBuild"

# Aguardar alguns segundos
sleep 3

# Tentar build novamente
yarn ios:simulator
```

### Solução B: Limpar Workspace do Xcode

```bash
# Navegar até o projeto
cd /Users/dyegolima/projects/pet/petmatch

# Limpar via xcodebuild
xcodebuild clean -workspace ios/petmatch.xcworkspace -scheme petmatch

# Remover diretório de build
rm -rf ios/build

# Tentar novamente
yarn ios:simulator
```

### Solução C: Reiniciar Mac (Último Recurso)

Se nada funcionar:

```bash
# Salvar todo o trabalho
# Fechar todos os aplicativos
sudo reboot
```

Após reiniciar:

```bash
cd /Users/dyegolima/projects/pet/petmatch
yarn start --reset-cache &
sleep 5
yarn ios:simulator
```

## 🔧 Prevenção

### 1. Evitar Múltiplos Builds Simultâneos

- **Não** execute `yarn ios` múltiplas vezes seguidas
- **Aguarde** o build anterior terminar (mesmo que pareça travado)
- Use **Ctrl+C** para cancelar build antes de tentar novamente

### 2. Limpar Antes de Build

Script de segurança antes de builds:

```bash
# criar arquivo: clean_before_build.sh
#!/bin/bash

echo "🧹 Limpando processos e caches..."

# Matar processos
killall xcodebuild 2>/dev/null
killall Simulator 2>/dev/null

# Aguardar
sleep 2

# Limpar caches
rm -rf ios/build
rm -rf ios/.xcode.env.local

echo "✅ Pronto para build!"
```

Uso:

```bash
chmod +x clean_before_build.sh
./clean_before_build.sh
yarn ios:simulator
```

### 3. Monitorar Processos

Verificar processos ativos antes de build:

```bash
# Ver processos do Xcode
ps aux | grep xcodebuild

# Ver processos de compilação
ps aux | grep clang

# Matar se necessário
killall xcodebuild
```

## 📊 Status do Build Atual

- ✅ Processos travados eliminados
- ✅ Caches limpos
- ✅ Build iniciado novamente
- ⏳ Aguardando compilação...

## 🚨 Se o Erro Persistir

### Verificar Espaço em Disco

```bash
df -h
```

Se o disco estiver cheio (>90%), libere espaço:

```bash
# Limpar cache do Homebrew
brew cleanup

# Limpar cache do npm
npm cache clean --force

# Limpar cache do yarn
yarn cache clean

# Remover DerivedData antigo
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# Remover simuladores não utilizados
xcrun simctl delete unavailable
```

### Verificar Permissões

```bash
# Dar permissões corretas ao projeto
cd /Users/dyegolima/projects/pet/petmatch
sudo chown -R $(whoami) ios/
```

### Reinstalar Command Line Tools

```bash
# Remover e reinstalar
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
```

## 📝 Comandos Úteis

### Monitoramento em Tempo Real

```bash
# Terminal 1: Logs do Metro
yarn start

# Terminal 2: Build
yarn ios:simulator

# Terminal 3: Monitorar processos
watch -n 2 'ps aux | grep xcodebuild'
```

### Build com Logs Detalhados

```bash
# Build com output completo
xcodebuild \
  -workspace ios/petmatch.xcworkspace \
  -scheme petmatch \
  -configuration Debug \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 16 Pro Max' \
  clean build \
  | tee build.log
```

Depois analise `build.log` para erros específicos.

## 🎯 Resumo da Solução

| Problema | Solução | Status |
|----------|---------|--------|
| Processos travados | `killall xcodebuild` | ✅ Resolvido |
| Cache corrompido | `rm -rf DerivedData` | ✅ Limpo |
| Lock files | `rm -rf ios/build` | ✅ Removido |
| Build iniciado | `yarn ios:simulator` | ✅ Executando |

---

**Última atualização**: Build em andamento após aplicar todas as soluções.

**Próximo passo**: Aguardar conclusão do build (2-5 minutos).
