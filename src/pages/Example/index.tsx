import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { petActions } from '../../redux/petSlice/slice';
import { Divider, Layout, Button } from '@ui-kitten/components';

export function Example() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const petState = useAppSelector((state: RootState) => state.petState);

  return (
    <Layout style={{ flex: 1, padding: 16 }} level="3">
      <Text>Tela Exemplo</Text>

      <Text>Exemplo Redux</Text>
      <Text>{`Nome: ${petState.user.name}`}</Text>
      <Text>{`Email: ${petState.user.email}`}</Text>
      <Text>{`Telefone: ${petState.user.phone}`}</Text>

      <Button
        onPress={() =>
          dispatch(
            petActions.setUpdateUser({
              email: 'dyegos@gmail.com',
              phone: 61981122323,
            }),
          )
        }
      >
        Usar Redux
      </Button>

      <Divider style={{ marginVertical: 16 }} />

      <Button size="tiny">TINY</Button>
      <Divider style={{ marginVertical: 16 }} />
      <Button size="small">SMALL</Button>
      <Divider style={{ marginVertical: 16 }} />
      <Button size="medium">Medium</Button>
      <Divider style={{ marginVertical: 16 }} />

      <Text>Exemplo Navegacao</Text>
      <Button onPress={() => navigation.navigate('Model')}>Navegar</Button>
    </Layout>
  );
}
