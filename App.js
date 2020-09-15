import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { init } from './database/placesDb';
import placesReducer from './store/reducers/places';

import PlacesNavigator from './navigation/PlacesNavigator';

init()
  .then(() => {
    console.log('Initialized database.');
  })
  .catch((error) => {
    console.log('Initializing database failed.');
    console.log(error);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
