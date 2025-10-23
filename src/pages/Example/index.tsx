import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text } from 'react-native';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { petActions } from '../../redux/petSlice/slice';
import { Divider, Layout, Button } from '@ui-kitten/components';
import { API_URL, APP_NAME } from '@env';

import {
  getVersion,
  getSystemName,
  useBatteryLevel,
} from 'react-native-device-info';
import { useState } from 'react';

import {
  IJsonResponse,
  requestJson,
} from '../../services/requests/ModalRequest';

export function Example() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const petState = useAppSelector((state: RootState) => state.petState);
  const [data, setData] = useState<IJsonResponse | undefined>();

  const handleRequest = async () => {
    const response = await requestJson();
    setData(response);
  };

  return (
    <Layout style={{ flex: 1, padding: 16 }} level="2">
      <ScrollView>
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

        <Divider style={{ marginVertical: 16 }} />
        <Text>Exemplo Device Info</Text>
        <Text>Vesao: {getVersion()}</Text>
        <Text>Nome Sistema: {getSystemName()}</Text>
        <Text>Bateria: {useBatteryLevel()}</Text>

        <Divider style={{ marginVertical: 16 }} />
        <Text>Exemplo Request</Text>
        <Button onPress={handleRequest}>Navegar</Button>
        <Text>{data?.slideshow.author}</Text>

        <Divider style={{ marginVertical: 16 }} />
        <Text>Exemplo DotEnv</Text>
        <Text>ENV URL: {API_URL}</Text>
        <Text>ENV NAME: {APP_NAME}</Text>
      </ScrollView>
    </Layout>
  );
}
