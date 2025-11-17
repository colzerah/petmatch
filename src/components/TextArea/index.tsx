import {
  Textarea as TextareaGluestack,
  TextareaInput,
} from '@/components/ui/textarea';
import { View } from 'react-native';
import { container } from './styles';
import { TextAreaProps } from './textareaDTO';

export function Textarea({
  size,
  invalid,
  disabled,
  placeholder,
}: TextAreaProps) {
  return (
    <View style={container}>
      <TextareaGluestack
        size={size}
        isInvalid={invalid}
        isDisabled={disabled}
        className="w-80"
      >
        <TextareaInput placeholder={placeholder} />
      </TextareaGluestack>
    </View>
  );
}
