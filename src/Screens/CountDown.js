import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {discoverSliceAction} from '../store/DiscoverSlice';

import Header from '../component/Header';
import CountDownUi from '../component/common/CountDownUi';
import {IMAGES_URL} from '../component/apiServices/ApiServices';
import {TrashIcon} from 'react-native-heroicons/outline';

function CountDown() {
  const {selectedMovies} = useSelector(
    state => state.discoverSlice.discoverSlice,
  );
  const dispatch = useDispatch();
  const handleRemoveItem = item => {
    dispatch(discoverSliceAction.removeSelectedMovies(item.id));
  };
  return (
    <View style={styles.Container}>
      <Header title={'Count Down'} />
      <ScrollView>
        {selectedMovies.length === 0 ? (
          <Text style={styles.error}>No Movies Added To Planner</Text>
        ) : (
          selectedMovies.map((item, index) => (
            <View key={index}>
              <View style={styles.countdownContainer}>
                <Image
                  source={{uri: IMAGES_URL + item.poster_path}}
                  style={styles.countdownImage}
                />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <CountDownUi release_date={item.release_date} />
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveItem(item)}
                  style={styles.button}>
                  <TrashIcon size={20} color="#fff" style={styles.iconStyles} />
                </TouchableOpacity>
              </View>
              <Divider />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2B2937',
  },
  countdownContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  Text: {
    color: '#ccc',
  },
  error: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
    height: '90%',
    textAlignVertical: 'center',
    margin: 20,
  },
  title: {
    color: '#888',
    fontWeight: '500',
    fontSize: 13,
    padding: 5,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  countdownImage: {
    height: 120,
    width: 70,
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#888',
    width: '50%',
    alignSelf: 'center',
  },
});

export default CountDown;
