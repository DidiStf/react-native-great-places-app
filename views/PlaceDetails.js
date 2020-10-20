import React, { useCallback, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { deletePlaceAction } from '../store/actions/places';
import { selectById as selectPlaceById } from '../store/selectors/places';
import { isAndroid } from '../helpers/platform';
import colors from '../constants/colors';

import CustomHeaderButton from '../components/HeaderButton';
import MapPreview from '../components/MapPreview';

const PlaceDetailsView = ({ navigation }) => {
  const dispatch = useDispatch();
  const placeId = navigation.getParam('placeId');
  const place = useSelector((state) => selectPlaceById(state, { id: placeId }));
  const initialLocation = {
    latitude: place?.latitude,
    longitude: place?.longitude,
  };

  const handleDeletePlace = useCallback(() => {
    dispatch(deletePlaceAction(placeId));
    navigation.goBack();
  }, [placeId]);

  const handleShowMap = () => {
    navigation.navigate('Map', {
      readOnly: true,
      initialLocation,
    });
  };

  useEffect(() => {
    navigation.setParams({ deletePlace: handleDeletePlace });
  }, [handleDeletePlace]);

  return (
    <ScrollView contentContainerStyle={styles.placeDetailsView}>
      <Image source={{ uri: place?.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place?.address}</Text>
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
  const handleDeletePlace = navigation.getParam('deletePlace');
  const title = navigation.getParam('placeTitle');
  return {
    headerTitle: title,
    headerRight: () => {
      const icon = isAndroid ? 'md-trash' : 'ios-trash';

      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Delete Place'
            iconName={icon}
            onPress={handleDeletePlace}
          />
        </HeaderButtons>
      );
    },
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
