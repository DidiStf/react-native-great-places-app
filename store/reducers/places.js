import { ADD_PLACE, DELETE_PLACE, GET_ALL_PLACES } from '../actions/places';
import Place from '../../models/Place';

const placesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const {
        id,
        title,
        imageUri,
        address,
        latitude,
        longitude,
      } = action.payload.placeData;
      const newPlace = new Place(
        id.toString(),
        title,
        imageUri,
        address,
        latitude,
        longitude
      );
      return [...state, newPlace];
    }
    case DELETE_PLACE: {
      const id = action.payload;
      return state.filter((place) => place.id !== id);
    }
    case GET_ALL_PLACES: {
      const initialPlaces = action.payload.places;
      let places = [];
      initialPlaces.map((place) => {
        const { id, title, imageUri, address, latitude, longitude } = place;
        const newPlace = new Place(
          id.toString(),
          title,
          imageUri,
          address,
          latitude,
          longitude
        );
        places.push(newPlace);
      });
      return places;
    }
    default:
      return state;
  }
};

export default placesReducer;
