import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BookingScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const { event } = route.params || {};
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    if (!data.name || !data.email || !data.phone || !data.tickets) {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
    }
    const newBooking = {
      id: Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      tickets: data.tickets,
      name: data.name,
      email: data.email,
      phone: data.phone,
      bookedAt: new Date().toISOString(),
    };

    const raw = await AsyncStorage.getItem('bookings');
    const existingBookings = raw ? JSON.parse(raw) : [];
    const existing = existingBookings || [];
    existing.push(newBooking);
    await AsyncStorage.setItem('bookings', JSON.stringify(existing));
    Alert.alert('Success', 'Booking saved!');
    reset();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking for {event.title}</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={'#000'}
            placeholder="Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={'#000'}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={'#000'}
            placeholder="Phone"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="tickets"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Tickets"
            placeholderTextColor={'#000'}
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => handleSubmit(onSubmit)}
      >
        <Text>Submit Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#cdf5ffff',
  },
});
