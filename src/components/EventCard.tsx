import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSource,
} from 'react-native';
import React from 'react';

interface EventCardProps {
  item: any;
  navigation: any;
  eventImages: ImageSource;
}

const EventCard = ({ item, navigation, eventImages }: EventCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('EventDetails', {
          event: item,
          imageSource: eventImages[item.image as string],
        })
      }
    >
      <Image source={eventImages[item.image as string]} style={styles.image} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text>
          {item.date} - {item.location}
        </Text>
        <Text>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderWidth: 0.5,
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
