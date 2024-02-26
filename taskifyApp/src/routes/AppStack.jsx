import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tasks from '../screens/Tasks';
import TaskDetails from '../screens/TaskDetails';

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="tasks" component={Tasks} />
      <Stack.Screen name="taskDetails" component={TaskDetails} />
    </Stack.Navigator>
  );
};

export default AppStack;
