import React from 'react';
import {useAuth} from '../context/Auth';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Router = () => {
  const {isAuthenticated} = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
