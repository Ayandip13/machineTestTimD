import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import events from '../../data/events.json';
import { useNavigation } from '@react-navigation/native';
import EventCard from '../components/EventCard';

export const eventImages: Record<string, any> = {
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
          <EventCard
            item={item}
            navigation={navigation}
            eventImages={eventImages}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
