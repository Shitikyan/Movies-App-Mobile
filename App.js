import React from 'react';
import {StyleSheet, StatusBar, View, Platform} from 'react-native';

import MoviesPlanner from './src/Screens/MoviesPlanner';
import CountDown from './src/Screens/CountDown';
import Discover from './src/Screens/Discover';
import Statistics from './src/Screens/Statistics';
import TvTracker from './src/Screens/TvTracker';
import Details from './src/Screens/Details';
import TvShowDetails from './src/Screens/TvShowDetails';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'; // Update the import statement
import {
  CalendarIcon,
  ClockIcon,
  TvIcon,
  CircleStackIcon,
} from 'react-native-heroicons/outline';
import {GlobeAsiaAustraliaIcon} from 'react-native-heroicons/solid';

import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/store/Store';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import MoviePlannerForm from './src/Screens/MoviePlannerForm';
import EpisodeDetails from './src/Screens/EpisodeDetails';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const defaultIconColor = 'black';
const defaultIconSize = 20;

const persistedStore = persistStore(store);

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
function App() {
  return (
    <>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: '#383A4C'}}>
        <StatusBar
          translucent
          backgroundColor="#383A4C"
          barStyle="light-content"
        />
      </View>
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <NavigationContainer>
              <Tab.Navigator
                labeled={true}
                barStyle={styles.barStyle}
                activeColor="white"
                inactiveColor="gray">
                <Tab.Screen
                  name="Planner"
                  component={PlannerNavigation}
                  options={{
                    tabBarIcon: ({color, size}) => (
                      <CalendarIcon color={'#fff'} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Discover"
                  component={DiscoverNavigation}
                  options={{
                    tabBarIcon: ({color, size}) => (
                      <GlobeAsiaAustraliaIcon color={'#fff'} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Count Down"
                  component={CountDown}
                  options={{
                    tabBarIcon: ({color, size}) => <ClockIcon color={'#fff'} />,
                  }}
                />
                <Tab.Screen
                  name="TV Tracker"
                  component={TvTrackerNavigation}
                  options={{
                    tabBarIcon: ({color, size}) => <TvIcon color={'#fff'} />,
                  }}
                />
                <Tab.Screen
                  name="Statistics"
                  component={Statistics}
                  options={{
                    tabBarIcon: ({
                      color = defaultIconColor,
                      size = defaultIconSize,
                    }) => <CircleStackIcon color={'#fff'} />,
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </View>
    </>
  );
}

const DiscoverNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Discover"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Episode Details" component={Discover} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

const TvTrackerNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Discover"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        cardStyleInterpolator: ({current}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen name="Tv Discover" component={TvTracker} />
      <Stack.Screen name="Tv Details" component={TvShowDetails} />
      <Stack.Screen name="EpisodeDetails" component={EpisodeDetails} />
    </Stack.Navigator>
  );
};

const PlannerNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="TVPlanner"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        cardStyleInterpolator: ({current}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen name="TVPlanner" component={MoviesPlanner} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="MoviePlannerForm" component={MoviePlannerForm} />
      <Stack.Screen name="Tv Details" component={TvShowDetails} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barStyle: {
    backgroundColor: '#383A4C',
  },
});

export default App;
