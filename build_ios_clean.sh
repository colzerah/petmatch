#!/bin/bash
set -e

echo "🧹 Limpando cache do React Native..."
rm -rf node_modules/.cache
rm -rf ios/build

echo "🗑️ Limpando Pods..."
cd ios
rm -rf Pods Podfile.lock

echo "📦 Reinstalando Pods..."
pod install

# echo "🔨 Buildando app para simulador iPhone 16 Pro Max..."
# cd ..
# npx react-native run-ios --simulator "iPhone 16 Pro Max"

echo "✅ Build completo!"
