import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../component/Header';
import {PlusIcon} from 'react-native-heroicons/outline';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';
import {IMAGES_URL} from '../component/apiServices/ApiServices';
import {discoverSliceAction} from '../store/DiscoverSlice';

function TvTracker({navigation}) {
  const {selectedTvShow} = useSelector(
    state => state.discoverSlice.discoverSlice,
  );
  const dispatch = useDispatch();
  const handleNavigate = item => {
    navigation.navigate('Tv Details', {id: item.id, isMovie: false});
  };
  const handleDeleteTvShow = data => {
    // dispatch(discoverSliceAction.removeSelectedTvShow(data.id));
    navigation.navigate('EpisodeDetails', {id: data.id});
  };
  return (
    <View style={styles.Container}>
      <Header title={'TV Tracker'} />
      <View style={styles.tvShowDetailes}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleNavigate}>
          <View>
            <PlusIcon size={20} color={'#fff'} />
          </View>
          <Text style={styles.buttonText}>Add New TV Show Plan</Text>
        </TouchableOpacity>

        {selectedTvShow.map((data, index) => (
          <TouchableOpacity
            onPress={() => handleDeleteTvShow(data)}
            key={index}>
            <Image
              style={styles.tvImage}
              source={{uri: IMAGES_URL + data.poster_path}}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2B2937',
  },
  tvShowDetailes: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    padding: 15,
    gap: 10,
  },
  Text: {
    color: '#ccc',
  },
  buttonContainer: {
    height: 160,
    width: 100,
    backgroundColor: '#383A4C',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: '#ccc',
    textAlign: 'center',
  },
  tvImage: {
    height: 160,
    width: 100,
    borderRadius: 6,
  },
});
export default TvTracker;
