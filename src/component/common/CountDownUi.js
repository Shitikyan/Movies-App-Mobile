/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CalculateReleaseDate from './CalculateReleaseDate';

const CountDownUi = ({release_date}) => {
  return (
    <>
      {release_date && (
        <View style={styles.countDownContainer}>
          <View>
            <View style={styles.countdown}>
              <Text style={styles.countdownText}>
                {CalculateReleaseDate(release_date).days}
              </Text>
            </View>
            <Text style={styles.text}>Days</Text>
          </View>
          <View>
            <View style={styles.countdown}>
              <Text style={styles.countdownText}>
                {CalculateReleaseDate(release_date).hours}
              </Text>
            </View>
            <Text style={styles.text}>Hours</Text>
          </View>
          <View>
            <View style={styles.countdown}>
              <Text style={styles.countdownText}>
                {CalculateReleaseDate(release_date).minutes}
              </Text>
            </View>
            <Text style={styles.text}>Minutes</Text>
          </View>
          <View>
            <View style={styles.countdown}>
              <Text style={styles.countdownText}>
                {CalculateReleaseDate(release_date).seconds}
              </Text>
            </View>
            <Text style={styles.text}>seconds</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default CountDownUi;

const styles = StyleSheet.create({
  countDownContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  countdown: {
    backgroundColor: '#333',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  text: {
    color: '#ccc',
    fontSize: 10,
    textAlign: 'center',
  },
  countdownText: {
    color: '#fff',
  },
});
