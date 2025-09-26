import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function MyBookingsScreen() {
  const [bookings, setBookings] = useState<any[]>([]);

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
});
