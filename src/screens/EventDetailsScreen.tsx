import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function EventDetailsScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  // we get both event and imageSource from params
  const { event, imageSource } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Use the passed imageSource directly */}
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.title2}>{event.description}</Text>
      <Text style={styles.title2}>Date: {event.date}</Text>
      <Text style={styles.title2}>Time: {event.time}</Text>
      <Text style={styles.title2}>Location: {event.location}</Text>
      <Text style={styles.title2}>Price: ₹{event.price}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Booking', { event })}
      >
        <Text style={styles.btntxt}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: '30%',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title2: {
    fontSize: 15,
    color: '#3b3b3bff',
  },
  btn: {
    alignItems: 'center',
    marginTop: '10%',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#cdf5ffff',
  },
  btntxt: {
    color: '#3b3b3bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
