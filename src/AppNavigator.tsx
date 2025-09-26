import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import EventListScreen from './screens/EventListScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import BookingScreen from './screens/BookingScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';
import { Image } from 'react-native';
import Splash from './screens/Splash';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Events"
        component={EventListScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/tabIcons/calendar.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/tabIcons/bookmark.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('currentUser');
      if (user) setIsLoggedIn(true);
      setLoading(false);
    })();
  }, []);

  if (loading) return null;

  //   const initialRouteName = isLoggedIn ? 'MainTabs' : 'Login';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Splash'}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetails"
          options={{ headerTitleAlign: 'center' }}
          component={EventDetailsScreen}
        />
        <Stack.Screen
          options={{ headerTitleAlign: 'center' }}
          name="Booking"
          component={BookingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
