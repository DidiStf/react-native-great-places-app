import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapPreview from './MapPreview';

import colors from '../constants/colors';

const LocationPicker = ({ onLocationPicked, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = navigation.getParam('pickedLocation');

  const verifyPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert(
        'Permissions denied!',
        'Sorry, we need location permissions to make this work!',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const handleGetLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    try {
      setIsLoading(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      const { coords } = location;
      setPickedLocation(coords);
      onLocationPicked(coords);
    } catch (error) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsLoading(false);
  };

  const handlePickOnMap = () => {
    navigation.navigate('Map');
  };

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        location={pickedLocation}
        onPress={handlePickOnMap}
        style={styles.mapPreview}>
        {isLoading ? (
          <ActivityIndicator size='large' color={colors.primary} />
        ) : (
          <Text>No location chosen yet.</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title='Get User Location'
          color={colors.primary}
          onPress={handleGetLocation}
        />
        <Button
          title='Pick On Map'
          color={colors.primary}
          onPress={handlePickOnMap}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default LocationPicker;
