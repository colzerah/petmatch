import { Text, View } from 'react-native';
import { container, content } from './styles';
import { Button as ButtonKit, Layout } from '@ui-kitten/components';
import { EvaSize, EvaStatus } from '@ui-kitten/components/devsupport';
import { ReactElement } from 'react';

interface IButtonProps {
  disabled?: boolean;
  size?: EvaSize;
  status?: EvaStatus;
  onPress?: () => void;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  title: string;
}
export function Button({
  disabled,
  size = 'medium',
  status = 'primary',
  onPress,
  iconLeft,
  iconRight,
  title,
}: IButtonProps) {
  // const iconLeft = <ICON name={iconLeft}/>
  return (
    <View style={container}>
      <View style={content}>
        <ButtonKit
          disabled={disabled}
          accessoryLeft={iconLeft}
          accessoryRight={iconRight}
          size={size}
          status={status}
          onPress={onPress}
          style={{
            borderWidth: 2,
            borderColor: '#FFC107', // cor mel
            borderRadius: 8,
          }}
        >
          {title}
        </ButtonKit>
      </View>
    </View>
  );
}
