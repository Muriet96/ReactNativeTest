import React, {useContext} from 'react';
import {View, Button, Text, Alert} from 'react-native';
import {users} from '../constants';
import {AuthContext} from '../../App';

const Home = ({}) => {
  const {getUser, logout} = useContext(AuthContext);
  const user = getUser();
  let fullName = '';

  if (user) {
    const userIndex = users.findIndex(userItem => userItem.user === user);
    if (userIndex > -1) {
      fullName = users[userIndex].fullName;
    }
  }

  const doLogout = () => {
    try {
      logout();
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.text);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hola {fullName}</Text>
      <Button title={'Logout'} onPress={doLogout} />
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
};

export default Home;
