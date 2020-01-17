import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

import { DevAvatar, Container, Name, Bio, Techs } from './styles';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      }
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -12.9187292, longitude: -38.3979505 }}>
        <DevAvatar
          source={{
            uri: 'https://api.adorable.io/avatars/50/netohelvecio.png',
          }}
        />

        <Callout
          onPress={() => {
            navigation.navigate('Profile', { github_username: 'netohelvecio' });
          }}
        >
          <Container>
            <Name>Helvécio Neto</Name>
            <Bio>
              Desenvolvedor NodeJS, React e React Native. Técnico em
              Desenvolvimento de Sistemas - Senai Cetind. Procurando novos
              desafios na área de programação.
            </Bio>
            <Techs>React, React Native, NodeJS</Techs>
          </Container>
        </Callout>
      </Marker>
    </MapView>
  );
}
