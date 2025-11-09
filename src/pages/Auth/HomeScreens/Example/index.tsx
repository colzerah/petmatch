import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { petActions } from '@/redux/petSlice/slice';
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
} from '../../../../services/requests/ModalRequest';
import Geolocation, {
  GeolocationConfiguration,
} from '@react-native-community/geolocation';

export function Example() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const petState = useAppSelector((state: RootState) => state.petState);
  const [data, setData] = useState<IJsonResponse | undefined>();

  const handleRequest = async () => {
    try {
      const response = await requestJson();
      setData(response);
    } catch (err) {
      console.log('Request erro', err);
      setData({
        slideshow: {
          author: '',
          date: '',
          title: 'falsy',
          slides: [],
        },
      });
    }
  };

  const config = {
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
  } as GeolocationConfiguration;

  Geolocation.setRNConfiguration(config);

  function getCurrentLocation() {
    Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition(
      async success => {
        console.log('📍 Localização atual:', success);
        navigation.navigate('Map');
      },
      // pos => {
      //   const { latitude, longitude } = pos.coords;
      //   setPosition({ latitude, longitude });
      //   console.log('📍 Localização atual:', latitude, longitude);
      // },
      error => {
        console.log('❌ Erro ao obter localização:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        useSignificantChanges: false,
      },
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Tela Exemplo</Text>
        <Text>Exemplo Redux</Text>
        <Text>{`Nome: ${petState.user.name}`}</Text>
        <Text>{`Email: ${petState.user.email}`}</Text>
        <Text>{`Telefone: ${petState.user.phone}`}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            dispatch(
              petActions.setUpdateUser({
                email: 'dyegos@gmail.com',
                phone: 61981122323,
              }),
            )
          }
        >
          <Text style={styles.buttonText}>Usar Redux</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={[styles.button, styles.buttonTiny]}>
          <Text style={styles.buttonText}>TINY</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={[styles.button, styles.buttonSmall]}>
          <Text style={styles.buttonText}>SMALL</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <Text>Exemplo Navegacao</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Model')}
        >
          <Text style={styles.buttonText}>Navegar</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        <Text>Exemplo Device Info</Text>
        <Text>Vesao: {getVersion()}</Text>
        <Text>Nome Sistema: {getSystemName()}</Text>
        <Text>Bateria: {useBatteryLevel()}</Text>

        <View style={styles.divider} />
        <Text>Exemplo Request</Text>
        <TouchableOpacity style={styles.button} onPress={handleRequest}>
          <Text style={styles.buttonText}>Fazer Request</Text>
        </TouchableOpacity>
        <Text>{data?.slideshow.author}</Text>

        <View style={styles.divider} />
        <Text>Exemplo DotEnv</Text>
        <Text>ENV URL: {API_URL}</Text>
        <Text>ENV NAME: {APP_NAME}</Text>

        <View style={styles.divider} />
        <Text>Exemplo Map</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            getCurrentLocation();
            // navigation.navigate('Map');
          }}
        >
          <Text style={styles.buttonText}>Navegar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 4,
  },
  buttonTiny: {
    padding: 6,
  },
  buttonSmall: {
    padding: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
});
