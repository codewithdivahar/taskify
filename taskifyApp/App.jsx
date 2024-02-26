import React from 'react';
import {AuthProvider} from './src/context/Auth';
import Router from './src/routes/Router';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <AuthProvider>
      <Router />
      <Toast />
    </AuthProvider>
  );
};

export default App;
