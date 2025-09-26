import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BookingScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const { event } = route.params || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tickets, setTickets] = useState('');

  const validate = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !tickets.trim()) {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
      return false;
    }
    const ticketsNum = Number(tickets);
    if (!Number.isFinite(ticketsNum) || ticketsNum <= 0) {
      ToastAndroid.show(
        'Please enter a valid number of tickets',
        ToastAndroid.SHORT,
      );
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      ToastAndroid.show('Please enter a valid email', ToastAndroid.SHORT);
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    if (!event) {
      ToastAndroid.show('No event found', ToastAndroid.SHORT);
      return;
    }

    const newBooking = {
      id: Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      tickets: Number(tickets),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      bookedAt: new Date().toLocaleTimeString(),
    };

    try {
      const currentUserRaw = await AsyncStorage.getItem('currentUser');
      const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;
      if (currentUser) {
        newBooking.userId = currentUser.id ?? currentUser.userId ?? null;
        newBooking.username = currentUser.username ?? currentUser.name ?? null;
      }

      const raw = await AsyncStorage.getItem('bookings');
      const existingBookings = raw ? JSON.parse(raw) : [];
      const existing = existingBookings || [];
      existing.push(newBooking);
      await AsyncStorage.setItem('bookings', JSON.stringify(existing));
      Alert.alert('Success', 'Booking saved!');
      setName('');
      setEmail('');
      setPhone('');
      setTickets('');
      navigation.goBack();
    } catch (err) {
      console.log('Error saving booking', err);
      Alert.alert('Error', 'Failed to save booking');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking for {event.title}</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor={'#777'}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#777'}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#777'}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Tickets"
        placeholderTextColor={'#777'}
        value={tickets}
        onChangeText={setTickets}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text>Submit Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F9FF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 0.2,
    backgroundColor: '#FBFBFB',
    borderColor: '#C5BAFF',
    paddingLeft: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  btn: {
    alignItems: 'center',
    marginTop: '10%',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: '#C4D9FF',
  },
});
