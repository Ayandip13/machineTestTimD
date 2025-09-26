import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './screens/LoginScreen';
import EventListScreen from './screens/EventListScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import BookingScreen from './screens/BookingScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabBarIcon({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) {
  return <FontAwesome name={name} size={size} color={color} />;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'Events' ? 'calendar' : 'bookmark';
          return <TabBarIcon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={{ headerTitleAlign: 'center' }}
        name="Events"
        component={EventListScreen}
      />
      <Tab.Screen
        name="MyBookings"
        options={{ headerTitleAlign: 'center' }}
        component={MyBookingsScreen}
      />
    </Tab.Navigator>
    /* eslint-enable react/no-unstable-nested-components */
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'MainTabs' : 'Login'}>
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
