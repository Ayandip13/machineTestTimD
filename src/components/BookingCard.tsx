import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingCard = ({ item }: { item: any }) => {
  const handleDelete = async () => {
    try {
      const rawData = await AsyncStorage.getItem('bookings');
      const dataArr = rawData ? JSON.parse(rawData) : [];
      const filteredData = dataArr.filter((b: any) => b.id !== item.id);
      await AsyncStorage.setItem('bookings', JSON.stringify(filteredData));
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error Deleting Bookings');
    }
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
    backgroundColor: '#FBFBFB',
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
