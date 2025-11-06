#!/bin/bash
set -e

echo "🧹 Limpando cache do React Native..."
rm -rf node_modules/.cache
rm -rf android/.gradle
rm -rf android/app/build


echo "👀 Limpando Watchman..."
watchman watch-del-all || true

echo "🗑️ Limpando dependências Node..."
rm -rf node_modules
rm -f package-lock.json yarn.lock

echo "📦 Reinstalando dependências Node..."
yarn install
# ou se usar yarn:
# yarn install

echo "🔨 Limpando e rebuildando Gradle..."
cd android
./gradlew clean
cd ..

echo "✅ Build Android completo!"
