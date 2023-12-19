/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';

const SearchInput = ({
  placeholder,
  setSearchText,
  searchText,
  handleSearchClick,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={value => setSearchText(value)}
      />
      <TouchableOpacity onPress={handleSearchClick}>
        <MagnifyingGlassIcon color="#888" size={20} style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default SearchInput;
