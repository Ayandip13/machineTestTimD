import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import users from '../../data/users.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Check credentials based on username & password
    const user = users.find(
      u => u.username === username && u.password === password,
    );

    if (user) {
      // Save logged-in user in AsyncStorage
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));

      // Reset navigation to MainTabs
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
        placeholderTextColor={'#000'}
        autoCapitalize="none"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#000'}
        autoCapitalize="none"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      {/* <Button title="Login" onPress={handleLogin} /> */}
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
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
    padding: 10,
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
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});
