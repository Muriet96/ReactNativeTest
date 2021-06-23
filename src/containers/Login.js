import React, {useState, useContext} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';

import {users} from '../constants';
import {AuthContext} from '../../App';

const Login = ({navigation}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  const hasData = user.trim().length && password.trim().length;

  const doLogin = () => {
    if (hasData) {
      const indexOfUser = users.findIndex(
        userItem => userItem.user === user && userItem.password === password,
      );
      if (indexOfUser > -1) {
        try {
          login(user);
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

      <Button
        onPress={doLogin}
        title={'Login'}
        style={styles.button}
        disabled={!hasData}
      />
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
