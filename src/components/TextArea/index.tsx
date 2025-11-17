import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { View } from 'react-native';
import { container } from './styles';
import { TextAreaProps } from './textareaDTO';

export function TextArea({
  size,
  invalid,
  disabled,
  placeholder,
}: TextAreaProps) {
  return (
    <View style={container}>
      <Textarea
        size={size}
        isInvalid={invalid}
        isDisabled={disabled}
        className="w-80"
      >
        <TextareaInput placeholder={placeholder} />
      </Textarea>
    </View>
  );
}
