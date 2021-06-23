import React from 'react';
import {useState, useEffect, createContext} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Login} from './src/containers';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();
const Stack = createStackNavigator();
const App = () => {
  const [user, setUser] = useState(null);
  const {setItem, getItem} = useAsyncStorage('LoggedUser');

  console.log('User', user);

  useEffect(() => {
    getItem().then(userValue => setUser(userValue));
  }, []);

  const authContext = React.useMemo(
    () => ({
      login: userData => {
        setItem(userData);
        setUser(userData);
      },
      logout: () => {
        setItem('');
        setUser(null);
      },
      user,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!user ? (
            <Stack.Screen name="Login" component={Login} />
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
