import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import linking from './src/utils/deeplink/linking';
import Tasks from './src/screens/Tasks';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="task" component={Tasks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
