import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {ChevronDownIcon} from 'react-native-heroicons/outline';
import {CheckCircleIcon} from 'react-native-heroicons/solid';
import {
  PencilIcon,
  ClipboardDocumentIcon,
  FilmIcon,
} from 'react-native-heroicons/outline';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {IMAGES_URL} from '../component/apiServices/ApiServices';
import {useDispatch} from 'react-redux';
import {discoverSliceAction} from '../store/DiscoverSlice';

const MoviePlannerForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {item} = route.params;
  const [planName, setPlanName] = useState('');
  const [note, setNote] = useState('');
  const [selected, setSelected] = useState('');
  let currentDate = moment().format('YYYY-MM-DD');
  const handleNavigate = () => {
    navigation.navigate('Tv Details', {isMovie: true});
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleAddMovieToPlanner = () => {
    if (planName === '' || !item) {
      Toast.show({
        type: 'info',
        text1: planName === '' ? 'Plan name is required' : 'No Movie Selected',
        position: 'bottom',
        visibilityTime: 3000,
      });
      return;
    } else if (selected === '') {
      Toast.show({
        type: 'info',
        text1: 'Date is not selected',
        position: 'bottom',
        visibilityTime: 3000,
      });
      return;
    }
    dispatch(
      discoverSliceAction.addTrackedMovie({...item, planName, note, selected}),
    );
    navigation.navigate('TVPlanner');
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
      <ScrollView>
        <LinearGradient
          colors={['#FF9D6C', '#FF6363']}
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.selectedMovieContainer}>
          <ImageBackground
            style={[styles.selectedMovieContainer, styles.movieBackdrop]}
            source={{uri: IMAGES_URL + item?.backdrop_path}}>
            <TouchableOpacity onPress={handleNavigate}>
              <FilmIcon color={'#fff'} size={50} />
            </TouchableOpacity>
          </ImageBackground>
        </LinearGradient>

        <View style={styles.addMovieContainer}>
          <Calendar
            current={currentDate}
            minDate={currentDate}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
            onDayPress={day => setSelected(day.dateString)}
            style={styles.calenderStyles}
            theme={styles.calenderTheme}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.iconContainer}>
            <PencilIcon color={'#fff'} />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Plan Name"
                placeholderTextColor={'#ccc'}
                value={planName}
                onChangeText={value => setPlanName(value)}
              />
            </View>
          </View>
          <View style={styles.iconContainer}>
            <ClipboardDocumentIcon color={'#fff'} />
            <View style={styles.inputContainer}>
              <TextInput
                editable
                placeholder="Add a note... (Optional)"
                placeholderTextColor={'#ccc'}
                multiline
                style={styles.textAreaInput}
                numberOfLines={3}
                value={note}
                onChange={value => setNote(value)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default MoviePlannerForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#383A4C',
    flex: 1,
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
  addMovieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  selectedMovieContainer: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    gap: 4,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 6,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222222',
    opacity: 0.3,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
  },
  textAreaInput: {
    flex: 1,
    height: 100,
    color: '#ccc',
    fontSize: 16,
  },
  calenderStyles: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  calenderTheme: {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    textSectionTitleColor: '#ccc',
    selectedDayBackgroundColor: '#000',
    monthTextColor: '#fff',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: '#fff',
    textDisabledColor: '#999',
  },
});
