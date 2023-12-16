/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Header from '../component/Header';
import StaticsCardWrapper from '../component/common/StaticsCardWrapper';
import {ClockIcon} from 'react-native-heroicons/outline';
import {
  FilmIcon,
  VideoCameraIcon,
  StarIcon,
  HeartIcon,
} from 'react-native-heroicons/solid';
import {IMAGES_URL} from '../component/apiServices/ApiServices';
import {useSelector} from 'react-redux';

const genres = [
  {id: 28, name: 'Action'},
  {id: 12, name: 'Adventure'},
  {id: 16, name: 'Animation'},
  {id: 35, name: 'comedy'},
  {id: 80, name: 'Crime'},
  {id: 99, name: 'Documentary'},
  {id: 18, name: 'Drama'},
  {id: 10751, name: 'Family'},
  {id: 14, name: 'Fantasy'},
  {id: 36, name: 'History'},
  {id: 27, name: 'Horror'},
  {id: 10402, name: 'Music'},
  {id: 9648, name: 'Mystery'},
  {id: 10749, name: 'Romance'},
  {id: 878, name: 'Science Fiction'},
  {id: 53, name: 'Thriller'},
  {id: 10752, name: 'War'},
  {id: 37, name: 'Western'},
];

const Statistics = () => {
  const {selectedTvShow} = useSelector(
    state => state.discoverSlice.discoverSlice,
  );
  const getGenresName = genresId => {
    const genre = genres.find(item => item.id === genresId);
    return genre ? genre.name : '';
  };
  return (
    <View style={styles.Container}>
      <Header title={'Statistics'} />
      <ScrollView>
        <View style={styles.cardWrapper}>
          <StaticsCardWrapper>
            <ClockIcon
              style={styles.alignIconCenter}
              size={30}
              color={'#FFD700'}
            />
            <Text style={styles.cardText}>
              You have watched 0 mi of 0 min left
            </Text>
          </StaticsCardWrapper>
          <StaticsCardWrapper>
            <VideoCameraIcon
              style={styles.alignIconCenter}
              size={30}
              color={'#FFD700'}
            />
            <Text style={styles.cardText}>
              Time you have spent watch TV Shows
            </Text>
            <View>
              <Text style={styles.titleText}>0</Text>
              <Text style={styles.cardText}>Minutes</Text>
            </View>
            <Text style={styles.cardText}>And to be exact:</Text>
            <View style={styles.statisticCount}>
              <View>
                <Text style={styles.titleText}>0</Text>
                <Text style={styles.cardText}>Year</Text>
              </View>
              <Divider />
              <View>
                <Text style={[styles.titleText, styles.centerView]}>0</Text>
                <Text style={styles.cardText}>Day</Text>
              </View>
              <Divider />
              <View>
                <Text style={styles.titleText}>0</Text>
                <Text style={styles.cardText}>Hours</Text>
              </View>
            </View>
          </StaticsCardWrapper>
          <StaticsCardWrapper>
            <HeartIcon
              style={styles.alignIconCenter}
              size={30}
              color={'#FFD700'}
            />
            <Text style={styles.cardText}>Your Favorite tv show is</Text>
            <ImageBackground
              style={styles.imageStyles}
              source={{uri: IMAGES_URL + selectedTvShow[0].backdrop_path}}>
              <View style={styles.backdrop}>
                <Text style={styles.tvShowName}>{selectedTvShow[0].name}</Text>
              </View>
            </ImageBackground>
          </StaticsCardWrapper>
          <StaticsCardWrapper>
            <StarIcon
              style={styles.alignIconCenter}
              size={30}
              color={'#FFD700'}
            />
            <Text style={styles.cardText}>
              It looks like your preferred genre is
            </Text>
            <Text style={styles.titleText}>
              {getGenresName(selectedTvShow[0].genre_ids[0])}
            </Text>
          </StaticsCardWrapper>
          <StaticsCardWrapper>
            <FilmIcon
              style={styles.alignIconCenter}
              size={30}
              color={'#FFD700'}
            />
            <Text style={styles.cardText}>
              The total of episodes you have watched
            </Text>
            <View>
              <Text style={styles.titleText}>0</Text>
              <Text style={styles.cardText}>Episodes</Text>
            </View>
            <Text style={styles.cardText}>And to be exact:</Text>
            <View style={styles.statisticCount}>
              <View>
                <Text style={styles.titleText}>0</Text>
                <Text style={styles.cardText}>TV Show</Text>
              </View>
              <Divider />
              <View>
                <Text style={[styles.titleText, styles.leftView]}>0</Text>
                <Text style={styles.cardText}>Season</Text>
              </View>
            </View>
          </StaticsCardWrapper>
        </View>
      </ScrollView>
    </View>
  );
};

const Divider = () => <View style={styles.divider}></View>;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2B2937',
  },
  cardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 10,
    padding: 20,
  },
  Text: {
    color: '#ccc',
  },
  cardText: {
    color: '#ccc',
    textAlign: 'center',
  },
  titleText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
  },
  alignIconCenter: {
    textAlign: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  statisticCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  divider: {
    width: 1,
    height: 25,
    backgroundColor: '#aaa',
  },
  imageStyles: {
    width: '100%',
    height: 165,
    borderRadius: 8,
    marginTop: 10,
    overflow: 'hidden',
  },
  tvShowName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  backdrop: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Statistics;
