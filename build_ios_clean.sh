#!/bin/bash
set -e

echo "🧹 Limpando cache do React Native..."
rm -rf node_modules/.cache
rm -rf ios/build
rm -rf $TMPDIR/metro-cache
rm -rf $TMPDIR/react-*
rm -rf node_modules/.cache


echo "👀 Limpando Watchman..."
watchman watch-del-all || true

echo "🧹 Limpando DerivedData do Xcode..."
rm -rf ~/Library/Developer/Xcode/DerivedData

echo "🗑️ Limpando Pods..."
cd ios
rm -rf Pods Podfile.lock build

echo "📦 Reinstalando Pods..."
bundle exec pod install --project-directory=.



# echo "🔨 Buildando app para simulador iPhone 16 Pro Max..."
# cd ..
# npx react-native run-ios --simulator "iPhone 16 Pro Max"

echo "✅ Build completo!"