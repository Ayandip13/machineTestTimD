import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import events from '../../data/events.json';
import { useNavigation } from '@react-navigation/native';

export const eventImages = {
  'techconf.png': require('../../assets/events/techconf.png'),
  'pitchfest.png': require('../../assets/events/pitchfest.png'),
  'concert.png': require('../../assets/events/concert.png'),
};

export default function EventListScreen() {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('EventDetails', {
                event: item,
                imageSource: eventImages[item.image],
              })
            }
          >
            <Image source={eventImages[item.image]} style={styles.image} />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text>
                {item.date} - {item.location}
              </Text>
              <Text>₹{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
