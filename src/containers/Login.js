import React, {useEffect, useCallback, useState} from 'react';
import { View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {users} from '../constants';

const Login = ({navigation}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = async () => {
    if (user.trim().length && password.trim().length) {
      const indexOfUser = users.findIndex(
        userItem => userItem.user === user && userItem.password === password,
      );
      if (indexOfUser > -1) {
        try {
          await AsyncStorage.setItem('LoggedUser', user);
        } catch (e) {
          console.log(e);
          Alert.alert('Error', e.text);
        }
      } else {
        Alert.alert('Usuario o contraseña incorrectos');
      }
    } else {
      Alert.alert('Llene todo los campos');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Usuario'}
        value={user}
        onChangeText={text => setUser(text)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Password'}
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry={true}
      />

      <Button onPress={doLogin} title={'Login'} style={styles.button} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: 16,
  },
};

export default Login;
