import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';

const SearchBarUI = ({placeholder, setSearchText, searchText}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={value => setSearchText(value)}
      />
      <MagnifyingGlassIcon color="#888" size={20} style={styles.searchIcon} />
    </View>
  );
};

export default SearchBarUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#383A4C',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#ccc',
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
});
