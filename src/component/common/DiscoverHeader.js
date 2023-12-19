import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const DiscoverHeader = ({setIsMovies}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsMovies(true)}>
        <Text style={styles.switchText}>Movies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsMovies(false)}>
        <Text style={styles.switchText}>Tv Shows</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DiscoverHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  switchButton: {
    backgroundColor: '#383A4C',
    borderRadius: 20,
  },
  switchText: {
    color: 'white',
    paddingVertical: 10,
    width: 120,
    textAlign: 'center',
  },
});
