import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import colors from '../constants/colors';
import { isAndroid } from '../helpers/platform';

const InteractiveMapView = ({ navigation }) => {
  const initialLocation = navigation.getParam('initialLocation');
  const readOnly = navigation.getParam('readOnly');

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  let markerCoordinates;
  const mapRegion = {
    latitude: initialLocation?.latitude ?? selectedLocation?.latitude ?? 37.78,
    longitude:
      initialLocation?.longitude ?? selectedLocation?.longitude ?? -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (selectedLocation)
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };

  const handleSelectLocation = (event) => {
    if (readOnly) return;
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleSavePickedLoaction = useCallback(() => {
    navigation.navigate('NewPlace', {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    // TODO: Add an Alert
    if (!selectedLocation) return;
    navigation.setParams({ saveLocation: handleSavePickedLoaction });
  }, [selectedLocation, handleSavePickedLoaction]);

  return (
    <MapView
      region={mapRegion}
      style={styles.map}
      onPress={handleSelectLocation}>
      {markerCoordinates && (
        <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

InteractiveMapView.navigationOptions = ({ navigation }) => {
  const handleSaveLocation = navigation.getParam('saveLocation');
  const readOnly = navigation.getParam('readOnly');

  if (readOnly) return {};

  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={handleSaveLocation}>
        <Text style={styles.headerButtonText}>
          {isAndroid ? 'SAVE' : 'Save'}
        </Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: isAndroid ? 'white' : colors.primary,
  },
  map: { flex: 1 },
});

export default InteractiveMapView;
