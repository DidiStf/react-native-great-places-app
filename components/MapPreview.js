import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { GOOGLE_API_KEY } from '../env';
const MapPreview = ({ children, location, onPress, style }) => {
  let imagePreviewUrl;

  if (location) {
    const { latitude, longitude } = location;
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.mapPreview, ...style }}>
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapPreview;
