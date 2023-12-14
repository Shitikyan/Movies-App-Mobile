import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import Header from '../component/Header';

import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getMoviesDetail, getMoviesVideos} from '../store/DiscoverSlice';

import {StarIcon} from 'react-native-heroicons/solid';
import {IMAGES_URL} from '../component/apiServices/ApiServices';
import {TouchableOpacity} from 'react-native';
import {Linking} from 'react-native';
import CountDownUi from '../component/common/CountDownUi';

const Details = ({navigation}) => {
  const route = useRoute();
  const {id, isMovies} = route.params;
  const dispatch = useDispatch();
  const {movieDetail, videos} = useSelector(
    state => state.discoverSlice.discoverSlice,
  );
  useEffect(() => {
    dispatch(getMoviesDetail({id, isMovies}));
    dispatch(getMoviesVideos({id, isMovies}));
  }, [id, dispatch, isMovies]);
  const handlePress = item => {
    if (item.key) {
      const youtubeUrl = `https://www.youtube.com/watch?v=${item.key}`;
      Linking.openURL(youtubeUrl);
    }
  };
  return (
    <View style={styles.container}>
      <Header title="Details" backButton={true} navigation={navigation} />
      <ScrollView>
        <View style={styles.detailsWrapper}>
          <Image
            style={styles.backdrop}
            source={{
              uri: IMAGES_URL + movieDetail?.backdrop_path,
            }}
          />
          {movieDetail && (
            <>
              <View>
                <Image
                  style={styles.poster}
                  source={{
                    uri: IMAGES_URL + movieDetail?.poster_path,
                  }}
                />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>
                    {movieDetail?.original_title || movieDetail?.name}
                  </Text>
                  <Text style={styles.status}>{movieDetail?.status}</Text>
                </View>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.overview}>{movieDetail?.overview}</Text>
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                  <PointUI />
                  {'  '}
                  <StarIcon color={'#ffcd3c'} size={10} />
                  {'  '}
                  {movieDetail?.vote_average}
                </Text>
                <Text style={styles.listText}>
                  <PointUI />
                  {'  '}
                  {movieDetail?.genres.length !== 0
                    ? movieDetail?.genres?.[0].name
                    : 'Unknown'}
                </Text>
                <Text style={styles.listText}>
                  <PointUI />
                  {'  '}
                  {!!isMovies
                    ? `${movieDetail?.runtime}min`
                    : `${movieDetail?.number_of_seasons}season`}
                </Text>
                <Text style={styles.listText}>
                  <PointUI />
                  {'  '}
                  {movieDetail?.production_companies.length !== 0
                    ? movieDetail?.production_companies[0]?.name
                    : 'Unknown'}
                </Text>
              </View>
              <View>
                <Text style={styles.title}>VIDEOS</Text>
                {videos.length === 0 ? (
                  <Text style={styles.status}>No video found</Text>
                ) : (
                  <FlatList
                    data={videos}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                      <TouchableOpacity onPress={() => handlePress(item)}>
                        <Image
                          style={styles.videoThumbnail}
                          source={{
                            uri: `https://img.youtube.com/vi/${item.key}/mqdefault.jpg`,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </>
          )}
          {movieDetail && (
            <CountDownUi release_date={movieDetail.release_date} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const PointUI = () => {
  const styles = StyleSheet.create({
    point: {
      width: 4,
      height: 4,
      borderRadius: 5,
      backgroundColor: '#1aa7ac',
    },
  });

  return <View style={styles.point} />;
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2937',
  },
  backdrop: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 10,
    position: 'absolute',
    top: -50,
    marginLeft: 15,
  },
  detailsWrapper: {
    padding: 10,
  },
  status: {
    color: '#888',
    fontSize: 14,
    lineHeight: 24,
  },
  overview: {
    color: '#888',
    textAlign: 'justify',
    fontSize: 14,
    lineHeight: 24,
  },
  titleContainer: {
    marginTop: 5,
    width: '67%',
    minHeight: 60,
    alignSelf: 'flex-end',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    borderTopWidth: 0.21,
    borderBottomWidth: 0.21,
    bordercolor: '#ccc',
    marginVertical: 10,
  },
  listText: {
    color: '#999',
    fontSize: 12,
  },
  videoThumbnail: {
    width: 120,
    height: 90,
    marginRight: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});
