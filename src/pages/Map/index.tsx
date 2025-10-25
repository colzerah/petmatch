import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Layout } from '@ui-kitten/components';
import MapViewDirections, {
  MapViewDirectionsOrigin,
} from 'react-native-maps-directions';
import Geolocation, {
  GeolocationConfiguration,
} from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Map() {
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    console.log('position', position);
  }, [position]);

  useEffect(() => {
    console.log('1');
    getCurrentLocation();
  }, []);

  const origin = position as MapViewDirectionsOrigin;
  const destination = { latitude: -15.835466, longitude: -48.108409 };
  const apiKey = 'AIzaSyDzPgdiQDHEGO9EM2fo-yJwaBpesHl8ssk';

  const config = {
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
  } as GeolocationConfiguration;

  Geolocation.setRNConfiguration(config);

  function getCurrentLocation() {
    Geolocation.requestAuthorization();

    console.log('2');
    Geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
        console.log('📍 Localização atual:', latitude, longitude);
      },
      error => {
        console.log('❌ Erro ao obter localização:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`,
        )
        .then(response => {
          console.log('AXIOS RES', response.data); // equivalente ao r.json() do fetch
        })
        .catch(error => {
          console.error('AXIOS ERROR', error);
        });
    })();
  }, [destination, origin]);

  if (!position) {
    return null;
  }

  return (
    <Layout style={{ flex: 1 }} level="2">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: -15.832701,
          longitude: -48.110249,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        // -15.832701, -48.110249

        mapType="standard"
        userLocationPriority="balanced"
        showsUserLocation={true} // mostra o ponto azul
        followsUserLocation={true} // faz o mapa seguir o usuário
        showsMyLocationButton={true} // botão padrão no Android
      >
        <MapViewDirections
          onReady={result => console.log('Distance: ', result.distance)}
          origin={origin}
          destination={destination}
          apikey={apiKey}
          strokeWidth={10}
          mode="DRIVING"
          // strokeColor="brown"
          strokeColors={['brown', 'green', 'red', 'blue']}
        />
      </MapView>
    </Layout>
  );
}
