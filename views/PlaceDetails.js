import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { selectById as selectPlaceById } from '../store/selectors/places';
import colors from '../constants/colors';

import MapPreview from '../components/MapPreview';

const PlaceDetailsView = ({ navigation }) => {
  const placeId = navigation.getParam('placeId');
  const { address, imageUri, latitude, longitude } = useSelector((state) =>
    selectPlaceById(state, { id: placeId })
  );
  const initialLocation = { latitude, longitude };

  const handleShowMap = () => {
    navigation.navigate('Map', {
      readOnly: true,
      initialLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.placeDetailsView}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{address}</Text>
        </View>
        <MapPreview
          location={initialLocation}
          onPress={handleShowMap}
          style={styles.mapPreview}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailsView.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam('placeTitle'),
  };
};

const styles = StyleSheet.create({
  address: {
    color: colors.primary,
    textAlign: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  mapPreview: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  placeDetailsView: {
    alignItems: 'center',
  },
});

export default PlaceDetailsView;
