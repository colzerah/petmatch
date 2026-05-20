import { View } from 'react-native';
import { container } from './styles';

import {
  Select as SelectGluestack,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from '@/components/ui/select';
import { ChevronDownIcon } from '@/components/ui/icon';
import { SelectProps } from './selectDTO';

export function Select({
  variant,
  size,
  placeholder,
  items,
  disabled,
  invalid,
  snapPoints,
  onOpen,
  onClose,
  onValueChange,
}: SelectProps) {
  return (
    <View style={container}>
      <SelectGluestack
        isDisabled={disabled}
        isInvalid={invalid}
        isRequired={true}
        onOpen={onOpen}
        onClose={onClose}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          variant={variant}
          size={size}
          style={{ justifyContent: 'space-between' }}
        >
          <SelectInput placeholder={placeholder} />
          <SelectIcon className="mr-3 " as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal snapPoints={snapPoints}>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {items.map(items => {
              return (
                <SelectItem
                  key={items.value}
                  value={items.value}
                  label={items.label}
                />
              );
            })}
          </SelectContent>
        </SelectPortal>
      </SelectGluestack>
    </View>
  );
}
