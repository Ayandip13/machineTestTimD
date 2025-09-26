import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingCard = ({ item }: { item: any }) => {
  const handleDelete = async () => {
    await AsyncStorage.removeItem('bookings');
  };
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{item?.eventTitle}</Text>
        <Text>
          {item?.date} | Tickets: {item?.tickets}
        </Text>
        <Text>Booked At: {item?.bookedAt}</Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <Text style={styles.cross}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  cross: {
    color: 'red',
    fontSize: 23,
  },
});
