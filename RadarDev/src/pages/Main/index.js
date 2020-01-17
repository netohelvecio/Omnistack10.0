import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  DevAvatar,
  Container,
  Name,
  Bio,
  Techs,
  Form,
  Input,
  SubmitButton,
} from './styles';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState();
  const [loading, setLoading] = useState(false);

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
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    }

    loadInitialPosition();
  }, []);

  async function loadDevs() {
    try {
      setLoading(true);

      const { latitude, longitude } = currentRegion;

      if (!techs) {
        Alert.alert('Digite uma tecnologia!');
        setLoading(false);

        return;
      }

      const response = await api.get('/search', {
        params: {
          latitude,
          longitude,
          techs,
        },
      });

      setTechs('');
      setLoading(false);
      setDevs(response.data);
    } catch (error) {
      Alert.alert('Erro!', 'Erro ao buscar devs');
      setTechs('');
      setLoading(false);
    }
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}
          >
            <DevAvatar
              source={{
                uri: dev.avatar_url,
              }}
            />

            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: dev.github_username,
                });
              }}
            >
              <Container>
                <Name>{dev.name}</Name>
                <Bio>{dev.bio}</Bio>
                <Techs>
                  {dev.techs
                    .map(tech => tech.replace(/^./, tech[0].toUpperCase()))
                    .join(', ')}
                </Techs>
              </Container>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Form>
        <Input
          placeholder="Buscar devs por techs..."
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="send"
          onSubmitEditing={loadDevs}
          onChangeText={setTechs}
          value={techs}
        />
        <SubmitButton onPress={loadDevs}>
          {loading ? (
            <ActivityIndicator color="#fff" size={22} />
          ) : (
            <MaterialIcons name="my-location" color="#fff" size={22} />
          )}
        </SubmitButton>
      </Form>
    </>
  );
}

Main.propTypes = {
  navigation: PropTypes.object.isRequired,
};
