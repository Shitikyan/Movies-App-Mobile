/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ChevronLeftIcon, ChevronDownIcon} from 'react-native-heroicons/outline';
import {useDispatch} from 'react-redux';
import {discoverSliceAction} from '../store/DiscoverSlice';

const Header = ({title, backButton, isTv}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleGoBack = () => {
    if (isTv) {
      dispatch(discoverSliceAction.resetVideos());
    }
    navigation.goBack();
  };
  return (
    <View
      style={backButton || isTv ? styles.header : styles.headerWithoutTitle}>
      {(backButton || isTv) && (
        <TouchableOpacity onPress={handleGoBack}>
          {isTv ? (
            <ChevronDownIcon size={20} color={'#fff'} />
          ) : (
            <ChevronLeftIcon size={20} color={'#fff'} />
          )}
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {(backButton || isTv) && <Text />}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#383A4C',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerWithoutTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383A4C',
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Header;
