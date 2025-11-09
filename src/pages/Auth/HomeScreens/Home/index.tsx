// import { Button } from '@react-navigation/elements';
import { View, Text } from 'react-native';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/hooks/useRedux';
// import { petActions } from '@/redux/petSlice/slice';
// import { GluestackButton } from '../../../../components/ui/GluestackButton';
import { Button, ButtonText } from '../../../../components/ui/button';

export function Home() {
  // const dispatch = useAppDispatch();
  const petState = useAppSelector((state: RootState) => state.petState);

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
      <Button variant="solid" size="xl" action="primary">
        <ButtonText>Click me</ButtonText>
      </Button>
      {/* <GluestackButton title="teste" onPress={() => console.log('teste')} /> */}
    </View>
  );
}
