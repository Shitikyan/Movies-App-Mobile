import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Slider,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ChevronDownIcon} from 'react-native-heroicons/outline';
import {CheckCircleIcon} from 'react-native-heroicons/solid';
import {useDispatch, useSelector} from 'react-redux';
import {discoverSliceAction, getTvShowEpisode} from '../store/DiscoverSlice';
import {IMAGES_URL} from '../component/apiServices/ApiServices';
import SelectDropdown from 'react-native-select-dropdown';

const EpisodeDetails = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const {id} = route.params;
  const {tvShowEpisodes, selectedTvShow} = useSelector(
    state => state.discoverSlice.discoverSlice,
  );
  const [selectedSeason, setSelectedSeason] = useState('');
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleAddMovieToPlanner = () => {};

  useEffect(() => {
    dispatch(getTvShowEpisode(id));
  }, [dispatch, id]);

  const convertSeasonNumberToArray = seasonNumber => {
    const seasonArray = [];
    for (let i = 1; i <= seasonNumber.length; i++) {
      seasonArray.push('season ' + i);
    }
    return seasonArray;
  };
  const handleAddEpisode = index => {
    dispatch(
      discoverSliceAction.addTvSeasonEpisode({
        id,
        selectedSeason: selectedSeason + 1,
        index,
      }),
    );
  };
  const isEpisodeWatched = (seasonIndex, episodeIndex) => {
    const selectedSeasons = selectedTvShow
      .filter(item => item.id === id)[0]
      .season.filter(item => item.number === seasonIndex + 1);
    if (selectedSeason.length !== 0) {
      const selectedEpisodes = selectedSeasons.flatMap(
        season => season.episodes,
      );
      return selectedEpisodes.includes(episodeIndex);
    }
    return false;
  };
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <ChevronDownIcon color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddMovieToPlanner}>
          <CheckCircleIcon color={'#fff'} />
        </TouchableOpacity>
      </View>
      {tvShowEpisodes !== null && (
        <ScrollView>
          <ImageBackground
            style={styles.backdropImage}
            source={{
              uri: IMAGES_URL + tvShowEpisodes.backdrop_path,
            }}>
            <View style={styles.overlayStyle}>
              <Image
                style={styles.posterImage}
                source={{uri: IMAGES_URL + tvShowEpisodes.poster_path}}
              />
              <View style={styles.backdropContainer}>
                <Text style={styles.title}>{tvShowEpisodes.name}</Text>
                <Text style={styles.normalText}>
                  Seasons: {tvShowEpisodes.number_of_seasons}
                </Text>
                <Text style={styles.normalText}>
                  Average Runtime: {tvShowEpisodes.episode_run_time[0]}min
                </Text>
                <Text style={styles.normalText}>
                  Genres: {tvShowEpisodes.genres.map(data => data.name)}
                </Text>
                <Text style={styles.normalText}>
                  Watched Episodes:{' '}
                  {selectedSeason !== '' &&
                    selectedTvShow.filter(item => item.id === id)[0].season[
                      selectedSeason
                    ].episodes.length}
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={
                    selectedSeason !== ''
                      ? tvShowEpisodes.seasons[selectedSeason].episode_count
                      : 0
                  }
                  value={
                    selectedSeason !== ''
                      ? selectedTvShow.filter(item => item.id === id)[0].season[
                          selectedSeason
                        ].episodes.length
                      : 0
                  }
                  minimumTrackTintColor="#FFD700"
                  thumbTintColor="transparent"
                />
              </View>
            </View>
          </ImageBackground>

          <View style={styles.seasonContainer}>
            {tvShowEpisodes.seasons && tvShowEpisodes.seasons.length > 0 ? (
              <SelectDropdown
                onSelect={(selectedItem, index) => {
                  setSelectedSeason(index);
                }}
                data={convertSeasonNumberToArray(tvShowEpisodes.seasons)}
                searchInputStyle={styles.searchInput}
                buttonStyle={styles.dropdown}
                buttonTextStyle={styles.dropdownText}
                rowStyle={styles.dropdownRow}
                defaultButtonText="Select Season"
                rowTextStyle={styles.dropdownRowText}
              />
            ) : (
              <Text>No seasons available</Text>
            )}
          </View>
          {selectedSeason !== '' && (
            <View style={styles.episodesContainer}>
              {Array.from(
                Array(tvShowEpisodes.seasons[selectedSeason].episode_count),
                (_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleAddEpisode(index + 1)}
                    style={
                      isEpisodeWatched(selectedSeason, index + 1)
                        ? styles.watchedEpisode
                        : styles.episodeItem
                    }>
                    <Text style={styles.normalText}>Episode {index + 1}</Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default EpisodeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2937',
  },

  navContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayStyle: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1,
    padding: 10,
    alignItems: 'center',
  },
  backdropImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterImage: {
    height: 130,
    width: 80,
    margin: 10,
    borderRadius: 6,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  normalText: {
    color: '#fff',
  },
  seasonContainer: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  dropdown: {
    backgroundColor: '#333',
    color: '#fff',
  },
  dropdownText: {
    backgroundColor: '#333',
    color: '#fff',
  },
  dropdownRow: {
    backgroundColor: '#333',
    color: '#fff',
  },
  dropdownRowText: {
    backgroundColor: '#333',
    color: '#fff',
  },
  episodesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 5,
  },
  episodeItem: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  watchedEpisode: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  slider: {
    width: '100%',
  },
});
