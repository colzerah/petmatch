import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { petActions } from '../../redux/petSlice/slice';
import { Divider, Layout, Button } from '@ui-kitten/components';

import {
  getVersion,
  getSystemName,
  useBatteryLevel,
} from 'react-native-device-info';
// import { useEffect } from 'react';
// import axios from 'axios';

export function Example() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const petState = useAppSelector((state: RootState) => state.petState);

  // useEffect(() => {
  //   (async () => {
  //     const response = await requestTodos();
  //     console.log('RESPONSE', response);
  //   })();
  // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get<any>(
  //         'https://www.boredapi.com/api/activity',
  //         {
  //           headers: {
  //             'Content-type': 'Application/json',
  //             Accept: 'Application/json',
  //           },
  //         },
  //       );
  //       console.log(response.data);
  //     } catch (err: any) {
  //       console.log('Erro Axios:', err);
  //       console.log(err.message || 'Erro desconhecido');
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Layout style={{ flex: 1, padding: 16 }} level="2">
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

      <Text>Exemplo Device Info</Text>
      <Divider style={{ marginVertical: 16 }} />
      <Text>Vesao: {getVersion()}</Text>
      <Text>Nome Sistema: {getSystemName()}</Text>
      <Text>Bateria: {useBatteryLevel()}</Text>
    </Layout>
  );
}
