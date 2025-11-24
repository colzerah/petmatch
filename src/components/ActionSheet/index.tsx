import { View } from 'react-native';
import {
  Actionsheet as ActionSheetGluesStack,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@/components/ui/actionsheet';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { ActionSheetProps } from './actionsheetDTO';
import { container } from './styles';

export function ActionSheet({
  title,
  items,
  isOpen,
  onClose,
  snapPoints,
}: ActionSheetProps) {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const handleClose = () => setShowActionSheet(false);

  return (
    <View style={container}>
      <Button title={title} onPress={() => setShowActionSheet(true)} />
      <ActionSheetGluesStack
        isOpen={isOpen || showActionSheet}
        onClose={onClose || handleClose}
        snapPoints={snapPoints}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {items.map(items => {
            return (
              <ActionsheetItem onPress={handleClose} key={items.value}>
                <ActionsheetItemText>{items.value}</ActionsheetItemText>
              </ActionsheetItem>
            );
          })}
        </ActionsheetContent>
      </ActionSheetGluesStack>
    </View>
  );
}
