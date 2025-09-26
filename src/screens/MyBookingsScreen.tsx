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
import BookingCard from '../components/BookingCard';

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
          setTimeout(() => {
            ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
          }, 200);
        },
      },
    ]);
  };

  const loadBookings = async () => {
    try {
      const raw = await AsyncStorage.getItem('bookings');
      const data = raw ? JSON.parse(raw) : [];
      const currentUserRaw = await AsyncStorage.getItem('currentUser');
      const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;
      if (currentUser) {
        const filtered = (data || []).filter((b: any) => {
          if (b.userId && currentUser.id) return b.userId === currentUser.id;
          if (b.username && currentUser.username)
            return b.username === currentUser.username;
          return false;
        });
        setBookings(filtered);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.log('Error loading bookings', err);
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadBookings();
    }, []),
  );

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <Text style={styles.title}>No Bookings yet</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <BookingCard key={item.id} item={item} />}
        />
      )}
      <TouchableOpacity
        // onPress={() => console.log("Logout pressed")}
        onPress={handleLogout}
        style={styles.btn}
      >
        <Text style={styles.btntxt}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
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
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 50,
  },
});
