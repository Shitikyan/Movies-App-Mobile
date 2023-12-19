/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {PlusIcon} from 'react-native-heroicons/solid';

const AddMoviePlan = ({navigation}) => {
  const handelOnNavigate = () => {
    navigation.navigate('MoviePlannerForm', {isMovies: true});
  };
  return (
    <TouchableOpacity style={styles.Container} onPress={handelOnNavigate}>
      <View>
        <PlusIcon size={20} color={'#fff'} />
      </View>
      <Text style={styles.Text}>Add New Movie Plan</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  Container: {
    height: 75,
    backgroundColor: '#383A4C',
    margin: 10,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  Text: {
    color: '#ccc',
  },
});
export default AddMoviePlan;
