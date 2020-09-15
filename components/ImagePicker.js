import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import colors from '../constants/colors';

const ImagePickerComponent = ({ onImagePicked }) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status !== 'granted') {
      Alert.alert(
        'Permissions denied!',
        'Sorry, we need camera permissions to make this work!',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const handlePickImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    onImagePicked(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title='Take Image'
        color={colors.primary}
        onPress={handlePickImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default ImagePickerComponent;
