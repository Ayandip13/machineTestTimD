import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function MyBookingsScreen() {
  const [bookings, setBookings] = useState<any[]>([]);
  const navigation: any = useNavigation();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('currentUser');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
          ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
        },
      },
    ]);
  };

  const loadBookings = async () => {
    try {
      const raw = await AsyncStorage.getItem('bookings');
      const data = raw ? JSON.parse(raw) : [];
      setBookings(data);
    } catch (err) {
      console.log('Error loading bookings', err);
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadBookings();
    }, []),
  );

  if (bookings.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No Bookings yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item?.eventTitle}</Text>
            <Text>
              {item?.date} | Tickets: {item?.tickets}
            </Text>
            <Text>Booked At: {item?.bookedAt}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={handleLogout} style={styles.btn}>
        <Text style={styles.btntxt}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  btn: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: '60%',
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#cdf5ffff',
  },
  btntxt: {
    color: '#000',
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    fontSize: 16,
  },
});
