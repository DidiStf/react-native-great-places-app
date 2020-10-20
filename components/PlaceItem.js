import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../constants/colors';

const PlaceItem = ({ address, imageUri, onSelect, title }) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: imageUri }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  address: {
    color: '#666',
    fontSize: 13,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 7,
    backgroundColor: 'gray',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 10,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default PlaceItem;
