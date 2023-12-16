import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../component/Header';
import AddMoviePlan from '../component/AddMoviePlan';
import {TrashIcon, FilmIcon, ClockIcon} from 'react-native-heroicons/outline';

import {useDispatch, useSelector} from 'react-redux';
import {discoverSliceAction} from '../store/DiscoverSlice';
import moment from 'moment';

function MoviesPlanner({navigation}) {
  const {trackedMovie} = useSelector(
    state => state.discoverSlice.discoverSlice,
  );
  const dispatch = useDispatch();
  const handleRemoveItem = item => {
    dispatch(discoverSliceAction.removeTrackedMovies(item.id));
  };
  const handleNavigationToDetail = item => {
    let isMovies = true;
    navigation.navigate('Details', {
      id: item.id,
      isMovies: isMovies,
    });
  };
  return (
    <View style={styles.Container}>
      <Header title={'Movies Planner'} />
      <View>
        <AddMoviePlan navigation={navigation} />
      </View>
      <View>
        {trackedMovie.length !== 0 ? (
          <View style={styles.imageWrapper}>
            <FlatList
              data={trackedMovie}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleNavigationToDetail(item)}>
                  <ImageBackground
                    source={{
                      uri:
                        'https://image.tmdb.org/t/p/w500' + item.backdrop_path,
                    }}
                    style={styles.backgroundImage}>
                    <View style={[styles.backgroundImage, styles.overlay]}>
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => handleRemoveItem(item)}>
                        <TrashIcon
                          size={20}
                          color="#fff"
                          style={styles.iconStyles}
                        />
                      </TouchableOpacity>
                      <View style={styles.mainDetailesWrapper}>
                        <View>
                          <Text style={styles.movieTitle}>{item.planName}</Text>
                          <View style={styles.dateWrapper}>
                            <FilmIcon
                              name="film-outline"
                              size={15}
                              color={'#fff'}
                            />
                            <Text style={styles.Text}>{item.title}</Text>
                          </View>
                        </View>
                        <View style={styles.dateWrapper}>
                          <ClockIcon
                            name="back-in-time"
                            size={15}
                            color={'#fff'}
                          />
                          <Text style={styles.Text}>
                            {moment(item.selected).format('MMM D [th]')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <Text style={[styles.Text, styles.errorText]}>No Movie Plans</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2B2937',
  },
  movieTitle: {
    color: '#ccc',
    fontSize: 18,
    fontWeight: '600',
  },
  Text: {
    color: '#ccc',
    fontSize: 12,
  },
  imageWrapper: {
    paddingHorizontal: 10,
    height: '85%',
  },
  deleteBtn: {width: 40, alignSelf: 'flex-end'},
  mainDetailesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 6,
  },
  backgroundImage: {
    height: 210,
    gap: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderRadius: 6,
    overflow: 'hidden',
    resizeMode: 'contain', // Adjust the image resizing mode as per your requirement
  },
  iconStyles: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  dateWrapper: {
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorText: {
    color: '#888',
    paddingHorizontal: 15,
    textAlign: 'center',
    verticalAlign: 'middle',
    height: '90%',
  },
});

export default MoviesPlanner;
