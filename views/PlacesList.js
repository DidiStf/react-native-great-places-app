import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

import { getAllPlacesAction } from '../store/actions/places';
import { select as selectPlaces } from '../store/selectors/places';
import { isAndroid } from '../helpers/platform';

const PlacesListView = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector(selectPlaces);

  useEffect(() => {
    dispatch(getAllPlacesAction());
  }, [dispatch, getAllPlacesAction]);

  return (
    <FlatList
      data={places}
      keyExtractor={({ id }) => id}
      renderItem={(itemData) => {
        const { item } = itemData;
        return (
          <PlaceItem
            imageUri={item.imageUri}
            title={item.title}
            address={item.address}
            onSelect={() => {
              navigation.navigate('PlaceDetails', {
                placeTitle: item.title,
                placeId: item.id,
              });
            }}
          />
        );
      }}
    />
  );
};

PlacesListView.navigationOptions = ({ navigation }) => ({
  headerTitle: 'All Places',
  headerRight: () => {
    const icon = isAndroid ? 'md-add' : 'ios-add';

    return (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add Place'
          iconName={icon}
          onPress={() => {
            navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    );
  },
});

export default PlacesListView;
