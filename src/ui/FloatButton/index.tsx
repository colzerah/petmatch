import { Pressable, View } from 'react-native';
import { container, content, touchableStyles } from './styles';
import {
  XIcon,
  StarIcon,
  ArrowCounterClockwiseIcon,
  HeartIcon,
  PlusIcon,
} from 'phosphor-react-native';
import { FloatButtonProps, TypeConfigMap } from '../../dtos/floatButtonDTO';

export function FloatButton({
  type = 'like',
  size = 'normal',
  onPress,
  disabled,
  top,
  bottom,
  left,
  right,
}: FloatButtonProps) {
  const iconSize = size === 'small' ? 24 : 32;
  const buttonSize = size === 'small' ? 40 : 55;

  const typeConfig: TypeConfigMap = {
    like: { color: '#00C851', icon: HeartIcon },
    dislike: { color: '#ff4444', icon: XIcon },
    back: { color: '#ffbb33', icon: ArrowCounterClockwiseIcon },
    superlike: { color: '#33b5e5', icon: StarIcon },
    default: { color: '#888888', icon: PlusIcon },
  };

  const { color, icon: IconComponent } = typeConfig[type];

  return (
    <View
      style={[
        container,
        { top: top, bottom: bottom, left: left, right: right },
      ]}
    >
      <View style={content}>
        <Pressable
          onPress={onPress}
          disabled={disabled}
          style={[
            touchableStyles,
            {
              width: buttonSize,
              height: buttonSize,
              borderColor: disabled ? '#ccc' : color,
            },
          ]}
        >
          {IconComponent && (
            <IconComponent
              size={iconSize}
              color={disabled ? '#ccc' : color}
              weight="fill"
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}
