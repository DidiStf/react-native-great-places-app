import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import colors from '../constants/colors';
import { isAndroid } from '../helpers/platform';

import PlacesLIstView from '../views/PlacesList';
import PlaceDetailsView from '../views/PlaceDetails';
import NewPlaceView from '../views/NewPlace';
import InteractiveMapView from '../views/InteractiveMap';

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesLIstView,
    PlaceDetails: PlaceDetailsView,
    NewPlace: NewPlaceView,
    Map: InteractiveMapView,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: isAndroid ? colors.primary : '',
      },
      headerTintColor: isAndroid ? 'white' : colors.primary,
    },
  }
);

export default createAppContainer(PlacesNavigator);
