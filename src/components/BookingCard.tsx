import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

const BookingCard = ({ item, onDelete }: { item: any; onDelete?: (id: number) => void }) => {
  const confirmDelete = () => {
    Alert.alert('Delete booking', 'Are you sure you want to delete this booking?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete && onDelete(item.id) },
    ]);
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
      <TouchableOpacity onPress={confirmDelete}>
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
