// import { Button } from '@react-navigation/elements';
import { View, Text } from 'react-native';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/hooks/useRedux';
// import { petActions } from '@/redux/petSlice/slice';
// import { GluestackButton } from '../../../../components/ui/GluestackButton';
import { Button, ButtonText } from '../../../../components/ui/button';
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@/components/ui/toast';

export function Home() {
  const toast = useToast();
  // const dispatch = useAppDispatch();
  const petState = useAppSelector((state: RootState) => state.petState);

  const handleShowToast = () => {
    console.log('Toast show called'); // Debug
    const toastId = toast.show({
      placement: 'top',
      duration: 3000,
      render: ({ id }) => {
        console.log('Toast render called with id:', id); // Debug
        return (
          <Toast
            nativeID={`toast-${id}`}
            action="success"
            variant="solid"
            style={{ zIndex: 9999 }}
          >
            <ToastTitle>Sucesso!</ToastTitle>
            <ToastDescription>Operação realizada com sucesso</ToastDescription>
          </Toast>
        );
      },
    });
    console.log('Toast ID returned:', toastId); // Debug
  };

  return (
    <View>
      <Text>Home Page</Text>
      <Text>{`Nome: ${petState.user.name}`}</Text>
      <Text>{`Email: ${petState.user.email}`}</Text>
      <Text>{`Telefone: ${petState.user.phone}`}</Text>

      {/* <Button
        onPress={() =>
          dispatch(
            petActions.setUpdateUser({
              email: 'dyego@gmail.com',
              phone: 61981122323,
            }),
          )
        }
      >
        Usar Redux
      </Button> */}
      <Button
        variant="solid"
        size="xl"
        action="primary"
        onPress={() => handleShowToast()}
      >
        <ButtonText>Click me</ButtonText>
      </Button>
      <Avatar size="md">
        <AvatarFallbackText>Jane Doe</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        />
        <AvatarBadge />
      </Avatar>

      {/* <GluestackButton title="teste" onPress={() => console.log('teste')} /> */}
    </View>
  );
}
