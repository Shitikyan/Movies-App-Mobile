import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../component/Header';
import SearchInput from '../component/common/SearchInput';
import DiscoverHeader from '../component/common/DiscoverHeader';
import {useDispatch, useSelector} from 'react-redux';

import {CheckIcon, PlusIcon} from 'react-native-heroicons/outline';
import {discoverSliceAction, getmovies} from '../store/DiscoverSlice';

function Discover({navigation}) {
  const {movies, selectedMovies} = useSelector(
    state => state.discoverSlice.discoverSlice,
  );
  const [isMovies, setIsMovies] = useState(true);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchText !== '') {
      dispatch(getmovies({isMovies, search: true, searchText}));
    } else {
      dispatch(getmovies({isMovies, search: false}));
    }
  }, [isMovies, dispatch, searchText]);
  const handleAddRemoveMovie = item => {
    dispatch(discoverSliceAction.addMovie(item));
  };
  const handleNavigate = item => {
    navigation.navigate('Details', {
      id: item.id,
      isMovies: isMovies,
    });
  };

  const handleSearchClick = () => {
    dispatch(getmovies({isMovies, search: true, searchText}));
  };

  return (
    <View style={styles.container}>
      <Header title={'Discover'} />
      <DiscoverHeader setIsMovies={setIsMovies} />
      <View style={{marginHorizontal: 20, marginVertical: 12}}>
        <SearchInput
          placeholder={isMovies ? 'Search movies...' : 'Search TV Show...'}
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearchClick={handleSearchClick}
        />
      </View>
      <View style={{flex: 1, paddingHorizontal: 15}}>
        {movies.length > 0 ? (
          <FlatList
            data={movies}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => handleNavigate(item)}>
                <ImageBackground
                  source={{
                    uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
                  }}
                  style={styles.movieDetailes}>
                  {isMovies && (
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={() => handleAddRemoveMovie(item)}>
                      {selectedMovies.findIndex(data => data.id === item.id) !==
                      -1 ? (
                        <CheckIcon size={20} color="#FFF" />
                      ) : (
                        <PlusIcon size={20} color="#FFF" />
                      )}
                    </TouchableOpacity>
                  )}
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.Text}>
            No {!!isMovies ? 'movies' : 'TV Shows'} found
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2937',
  },
  Text: {
    color: '#ccc',
  },
  imageContainer: {
    width: '50%',
    padding: 6,
  },
  movieDetailes: {
    flex: 1,
    height: 230,
    resizeMode: 'contain', // Adjust the image resizing mode as per your requirement
    borderRadius: 6,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 70,
    height: 30,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#383A4C',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 8,
  },
  errorText: {
    color: '#aaa',
  },
});

export default Discover;
