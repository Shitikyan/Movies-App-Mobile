/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StaticsCardWrapper = ({children}) => {
  return <View style={styles.statisticCard}>{children}</View>;
};

export default StaticsCardWrapper;

const styles = StyleSheet.create({
  statisticCard: {
    backgroundColor: '#383A4C',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
