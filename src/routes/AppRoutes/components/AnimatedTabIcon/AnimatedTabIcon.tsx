import { use, useEffect } from 'react';
import Animated, {
  useSharedValue,
  cancelAnimation,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface animatedIconProps {
  focused: boolean;
  children: React.ReactNode;
}

export const AnimatedTabIcon = ({ focused, children }: animatedIconProps) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    cancelAnimation(scale);
    if (focused) {
      scale.value = withSpring(1.2, { damping: 8, stiffness: 300 }, () => {
        scale.value = withSpring(1, { damping: 8, stiffness: 300 });
      });
    } else {
      scale.value = withSpring(1);
    }
  }, [focused, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
