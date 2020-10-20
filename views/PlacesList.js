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

  const onSelectPlace = (item) => {
    navigation.navigate('PlaceDetails', {
      placeTitle: item.title,
      placeId: item.id,
    });
  };

  const renderItem = (item) => {
    return (
      <PlaceItem
        imageUri={item.imageUri}
        title={item.title}
        address={item.address}
        onSelect={() => onSelectPlace(item)}
      />
    );
  };

  useEffect(() => {
    dispatch(getAllPlacesAction());
  }, [dispatch, getAllPlacesAction]);

  return (
    <FlatList
      data={places}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => renderItem(item)}
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
