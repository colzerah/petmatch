import {
  Animated,
  Button,
  Image,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { Layout } from '@ui-kitten/components';
import MapViewDirections from 'react-native-maps-directions';
import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

export function Map() {
  const position = { latitude: -15.8327, longitude: -48.110249 };
  const origin = { latitude: -15.8327, longitude: -48.110249 };
  const mapRef = useRef<MapView>(null);
  const watchIdRef = useRef<number | null>(null);
  const rotation = useRef(new Animated.Value(0)).current;
  const [isNavigating, setIsNavigating] = useState(false);

  const toggleNavigation = () => {
    setIsNavigating(prev => !prev);

    if (!isNavigating) {
      // Iniciar navegação
      startWatch();
    } else {
      // Parar navegação
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    }
  };

  const [coordinate] = useState(
    new AnimatedRegion({
      latitude: origin.latitude,
      longitude: origin.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }),
  );

  const destination = { latitude: -15.835466, longitude: -48.108409 };
  const destination2 = { latitude: -15.819463, longitude: -48.107742 };

  const apiKey = 'AIzaSyDzPgdiQDHEGO9EM2fo-yJwaBpesHl8ssk';

  const startNavigation = async () => {
    try {
      const scheme = Platform.select({
        ios: 'comgooglemaps://',
        android: 'google.navigation:',
      });

      const url =
        Platform.OS === 'ios'
          ? `${scheme}?saddr=${origin.latitude},${origin.longitude}&daddr=${destination.latitude},${destination.longitude}&directionsmode=driving`
          : `${scheme}q=${destination.latitude},${destination.longitude}&mode=d`;

      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
        console.log('✅ Navegação iniciada no Google Maps.');
      } else {
        // Fallback para navegador se o app não estiver instalado
        const webUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=driving`;
        await Linking.openURL(webUrl);
        console.log('🌐 Navegação aberta no navegador.');
      }
    } catch (error) {
      console.log('❌ Erro ao iniciar navegação:', error);
    }
  };

  const getBearing = (
    startLat: number,
    startLng: number,
    destLat: number,
    destLng: number,
  ) => {
    const startLatRad = (startLat * Math.PI) / 180;
    const startLngRad = (startLng * Math.PI) / 180;
    const destLatRad = (destLat * Math.PI) / 180;
    const destLngRad = (destLng * Math.PI) / 180;

    const y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad);
    const x =
      Math.cos(startLatRad) * Math.sin(destLatRad) -
      Math.sin(startLatRad) *
        Math.cos(destLatRad) *
        Math.cos(destLngRad - startLngRad);

    const brng = (Math.atan2(y, x) * 180) / Math.PI;
    return (brng + 360) % 360;
  };

  useEffect(() => {
    // Função de cleanup: será chamada quando o componente desmontar
    return () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
        console.log('🛑 GPS watch parado');
      }
    };
  }, []);

  const goMapNavigate = () => {
    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      console.log('🧹 Watch antigo limpo');
    }

    watchIdRef.current = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const bearing = getBearing(
          latitude,
          longitude,
          destination.latitude,
          destination.longitude,
        );

        // Atualiza coordenada animada
        coordinate
          .timing({
            latitude,
            longitude,
            duration: 100,
            toValue: 0,
            useNativeDriver: false,
            latitudeDelta: 0,
            longitudeDelta: 0,
          })
          .start();

        Animated.timing(rotation, {
          toValue: bearing,
          duration: 500,
          useNativeDriver: true,
        }).start();

        // Centraliza mapa no usuário e gira conforme direção
        mapRef.current?.animateCamera({
          center: { latitude, longitude },
          heading: bearing || 0,
          pitch: 60, // visão inclinada
          zoom: 18,
        });
      },
      error => console.log('❌ Erro GPS:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 1000,
        fastestInterval: 500,
      },
    );

    // Geolocation.clearWatch(watchId);
  };

  const startWatch = () => {
    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    watchIdRef.current = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const bearing = getBearing(
          latitude,
          longitude,
          destination2.latitude,
          destination2.longitude,
        );

        // Atualiza coordenada animada
        coordinate
          .timing({
            latitude,
            longitude,
            duration: 100,
            toValue: 0,
            useNativeDriver: false,
            latitudeDelta: 0,
            longitudeDelta: 0,
          })
          .start();

        // Rotaciona seta
        Animated.timing(rotation, {
          toValue: bearing,
          duration: 500,
          useNativeDriver: true,
        }).start();

        // Centraliza mapa no usuário
        mapRef.current?.animateCamera({
          center: { latitude, longitude },
          heading: bearing,
          pitch: 60,
          zoom: 18,
        });
      },
      error => console.log('❌ Erro GPS:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 1000,
        fastestInterval: 500,
      },
    );
  };

  return (
    <Layout style={{ flex: 1 }} level="2">
      <View style={{ position: 'absolute', top: 60, right: 10, zIndex: 999 }}>
        <Button
          title="Iniciar Navegação 🚗"
          onPress={() => toggleNavigation()}
        />
        <Button
          title="Iniciar Navegação 2 🚗"
          onPress={() => startNavigation()}
        />
      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="standard"
        userLocationPriority="balanced"
        // showsUserLocation={true} // mostra o ponto azul
        // followsUserLocation={true} // faz o mapa seguir o usuário
        showsMyLocationButton={true} // botão padrão no Android
        showsUserLocation={!isNavigating} // bolinha só no modo normal
        followsUserLocation={!isNavigating}
      >
        <Marker.Animated coordinate={coordinate}>
          <Image
            source={require('../../assets/car_arrow.png')} // ícone de seta do carro
            style={{
              width: 40,
              height: 40,
              transform: [{ rotate: '1 deg' }],
            }}
            resizeMode="contain"
          />
        </Marker.Animated>
        <Marker.Animated
          coordinate={destination}
          title="Destino"
          onPress={e => console.log('e', e)}
        />
        <Marker.Animated coordinate={destination2} title="Destino2" />
        {/* <Marker.Animated coordinate={destination} title="Destino" />
        <Marker.Animated coordinate={destination} title="Destino" /> */}

        <MapViewDirections
          onReady={result => {
            console.log('✅ Distance: ', result.distance);
          }}
          onError={errorMessage => {
            console.log('❌ Erro no MapViewDirections:', errorMessage);
          }}
          onStart={start => {
            console.log('START: ', start);
          }}
          origin={origin}
          destination={destination2}
          apikey={apiKey}
          strokeWidth={4}
          mode="DRIVING"
          strokeColor="blue"
          optimizeWaypoints={false}
          resetOnChange={false}
          // strokeColor="brown"
          // strokeColors={['brown', 'green', 'red', 'blue']}
        />
      </MapView>
    </Layout>
  );
}
