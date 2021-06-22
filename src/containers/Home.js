import React, {useEffect, useCallback} from 'react';
import { View, Button, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { users } from "../constants";

const Home = ({}) => {
  const user = AsyncStorage.getItem('LoggedUser');
  let fullName = '';

  if (user) {
    const userIndex = users.findIndex(userItem => userItem.user === user);
    if (userIndex > -1) {
      fullName = users[userIndex].fullName;
    }
  }

  const doLogout = async () => {
    try {
      await AsyncStorage.removeItem('UserLogged');
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
