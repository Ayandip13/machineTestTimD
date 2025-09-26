import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import users from '../../data/users.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation: any = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const user = users.find(
      u => u.username === username && u.password === password,
    );

    if (user) {
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={'#777'}
        autoCapitalize="none"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#777'}
        autoCapitalize="none"
        placeholder="Password"
        value={password}
        keyboardType='name-phone-pad'
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E8F9FF',
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  btn: {
    alignSelf: 'center',
    marginTop: '10%',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    width: '60%',
    elevation: 3,
    backgroundColor: '#cdf5ffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 0.5,
    marginBottom: 10,
    paddingLeft: 20,
    borderColor: '#005a66ff',
    borderRadius: 10,
  },
});
