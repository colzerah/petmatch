import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  cancelAnimation,
} from 'react-native-reanimated';

interface AnimatedIconProps {
  focused: boolean;
  children: React.ReactNode;
}

export const AnimatedTabIcon = ({ focused, children }: AnimatedIconProps) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    cancelAnimation(scale); // 🧠 cancela animação anterior
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
