import * as FileSystem from 'expo-file-system';
import { GOOGLE_API_KEY } from '../../env';
import { insertPlace, fetchPlaces } from '../../database/placesDb';

const ACTION_KEY = 'places';

//TODO: Separate the file system from theaction like the api in a different folder

export const ADD_PLACE = `${ACTION_KEY}/addPlace`;
export const GET_ALL_PLACES = `${ACTION_KEY}/getAllPlaces`;

export const addPlaceAction = (placeData) => async (dispatch) => {
  const { imageUri, latitude, longitude } = placeData;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
  );

  if (!response.ok) throw new Error('Something went wrong!');

  const resData = await response.json();

  if (!resData.results) throw new Error('Something went wrong!');

  const address = resData.results[0].formatted_address;
  const fileName = imageUri.split('/').pop();
  const newPath = FileSystem.documentDirectory + fileName;

  try {
    await FileSystem.moveAsync({
      from: imageUri,
      to: newPath,
    });
    const dbResult = await insertPlace({
      ...placeData,
      imageUri: newPath,
      address,
      latitude,
      longitude,
    });
    dispatch({
      type: ADD_PLACE,
      payload: {
        placeData: {
          ...placeData,
          id: dbResult.insertId,
          imageUri: newPath,
          address,
          latitude,
          longitude,
        },
      },
    });
  } catch (error) {
    // TODO: Add error handlers to the newPlace component
    console.log(error);
    throw error;
  }
};

export const getAllPlacesAction = () => async (dispatch) => {
  try {
    const dbResult = await fetchPlaces();
    dispatch({
      type: GET_ALL_PLACES,
      payload: { places: [...dbResult.rows._array] },
    });
  } catch (error) {
    throw error;
  }
};
