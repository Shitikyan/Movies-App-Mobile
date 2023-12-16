import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../component/Header';
import SearchBarUI from '../component/common/SearchBarUI';
import {useDispatch, useSelector} from 'react-redux';
import {discoverSliceAction, getTvShowByQuery} from '../store/DiscoverSlice';
import {IMAGES_URL} from '../component/apiServices/ApiServices';
import {useNavigation, useRoute} from '@react-navigation/native';

const TvShowDetails = () => {
  const route = useRoute();
  const {isMovie} = route.params;
  const [searchText, setSearchText] = useState('');
  const {videos} = useSelector(state => state.discoverSlice.discoverSlice);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSearchTvShow = () => {
    dispatch(getTvShowByQuery({searchText, isMovie}));
  };

  useEffect(() => {
    if (searchText !== '') {
      dispatch(getTvShowByQuery({isMovie, search: true, searchText}));
    } else {
      dispatch(getTvShowByQuery({isMovie, search: false}));
    }
  }, [isMovie, dispatch, searchText]);

  const handleAddTvShow = item => {
    if (!isMovie || isMovie === undefined) {
      dispatch(discoverSliceAction.addTvShow(item));
    }
    dispatch(discoverSliceAction.resetVideos());
    if (isMovie) {
      navigation.navigate('MoviePlannerForm', {item: item});
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={isMovie ? 'Movi Details' : 'TV Show Details'}
        isTv={true}
      />
      <View style={styles.detailesWrapper}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity onPress={handleSearchTvShow}>
            <Text style={styles.donebtn}>Done</Text>
          </TouchableOpacity>
          <SearchBarUI
            placeholder={isMovie ? 'Find Movies...' : 'Find TV Shows...'}
            setSearchText={setSearchText}
            searchText={searchText}
          />
        </View>
        <FlatList
          data={videos}
          numColumns={3}
          style={styles.tvContainer}
          contentContainerStyle={styles.tvListContent}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleAddTvShow(item)}
              key={item.id}>
              <Image
                style={styles.tvImage}
                source={{uri: IMAGES_URL + item.poster_path}}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default TvShowDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2937',
  },
  detailesWrapper: {
    flex: 1,
    padding: 10,
  },
  donebtn: {
    padding: 10,
    color: '#fff',
  },
  searchWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tvContainer: {
    gap: 10,
  },
  tvListContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tvImage: {
    height: 160,
    width: 100,
    margin: 5,
    borderRadius: 6,
  },
});
