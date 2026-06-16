import { View } from 'react-native';
import {
  Button as ButtonGlueStack,
  ButtonText,
  ButtonIcon,
} from '../ui/button';
import { ButtonProps } from './ButtonDTO';
import { container } from './styles';
import { createIcon } from '../../utils/createIcon';
import { AppleLogoIcon, GoogleLogoIcon } from 'phosphor-react-native';

export function Button({
  onPress,
  title,
  variant,
  size,
  disabled,
  action,
  secondary,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) {
  const AppleLogo = createIcon(AppleLogoIcon, {
    weight: 'bold',
    color: '#000',
    size: 22,
  });

  const GoogleLogo = createIcon(GoogleLogoIcon, {
    weight: 'bold',
    color: '#000',
    size: 22,
  });

  // const RenderIcon = () => {

  //   <IconComponent
  //   weight={weight}
  //   color={color}
  //   size={size}
  //   {...defaultProps}
  //   />
  // }

  const IconComponent = {
    AppleLogoIcon: AppleLogo,
    GoogleLogoIcon: GoogleLogo,
  };

  return (
    <View style={container}>
      <ButtonGlueStack
        {...props}
        onPress={onPress}
        variant={variant}
        size={size}
        disabled={disabled}
        action={action}
        className={`rounded-xl`}
      >
        {iconLeft && <ButtonIcon as={IconComponent[iconLeft]} />}
        <ButtonText>{title}</ButtonText>
        {iconRight && <ButtonIcon as={IconComponent[iconRight]} />}
      </ButtonGlueStack>
    </View>
  );
}
