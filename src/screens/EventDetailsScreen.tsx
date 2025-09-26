import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

export default function EventDetailsScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  // we get both event and imageSource from params
  const { event, imageSource } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Use the passed imageSource directly */}
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.description}</Text>
      <Text>Date: {event.date}</Text>
      <Text>Time: {event.time}</Text>
      <Text>Location: {event.location}</Text>
      <Text>Price: ₹{event.price}</Text>

      <Button
        title="Book Now"
        onPress={() => navigation.navigate('Booking', { event })}
      />
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
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
