import React, { useCallback, useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { addPlaceAction } from '../store/actions/places';

import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

import colors from '../constants/colors';

const NewPlaceView = ({ navigation }) => {
  const dispatch = useDispatch();
  const [placeData, setPlaceData] = useState({
    title: '',
  });

  const handleChangeTitle = useCallback(
    (text) => {
      // TODO: Add validation
      setPlaceData({ ...placeData, title: text });
    },
    [placeData]
  );

  const handleImagePicked = useCallback(
    (imageUri) => {
      setPlaceData({ ...placeData, imageUri });
    },
    [placeData]
  );

  const handleLocationPicked = useCallback(
    (location) => {
      const { latitude, longitude } = location;
      setPlaceData({ ...placeData, latitude, longitude });
    },
    [placeData]
  );

  const handleSavePlace = () => {
    dispatch(addPlaceAction(placeData));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={handleChangeTitle} />
        <ImagePicker onImagePicked={handleImagePicked} />
        <LocationPicker
          navigation={navigation}
          onLocationPicked={handleLocationPicked}
        />
        <Button
          title='Save Place'
          color={colors.primary}
          onPress={handleSavePlace}
          value={placeData.title}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceView.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Add New Place',
});

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceView;
