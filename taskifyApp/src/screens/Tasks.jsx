import {Button, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SERVER_URL} from '../constants/urls';

const Tasks = ({navigation}) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    axios
      .get(SERVER_URL + '/auth/loginSuccess', {
        withCredentials: true,
      })
      .then(response => {
        const {user} = response?.data;
        console.log('Response --->', response.data.user);
        if (user) {
          setUser(user);
        }
      })
      .catch(err => console.log('Error --->', err));
  }, []);

  const logout = () => {
    axios
      .get(SERVER_URL + '/auth/logout?deviceType=mobile', {
        withCredentials: true,
      })
      .then(response => {
        console.log('Response --->', response.data.success);
      })
      .catch(err => {
        console.log('Error --->', err);
      });
  };

  return (
    <View>
      <Text>Tasks</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  );
};

export default Tasks;
