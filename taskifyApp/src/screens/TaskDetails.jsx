import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useNavigation, useRoute} from '@react-navigation/native';
import {mergeObject} from '../utils';
import {useApi} from '../services/ApiServices';
import {useAuth} from '../context/Auth';

const TaskDetails = () => {
  const navigation = useNavigation();

  const {params} = useRoute();
  const {setDataUpdated} = useAuth();
  const {data, callApi} = useApi('updateTask');

  const {task, allTasks} = params;
  const {name, taskId, location, status} = task;
  const [text, setText] = useState(taskId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name.toUpperCase(),
      headerStyle: {
        backgroundColor: '#1e293b',
      },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  const handleSubmit = () => {
    const isCodeAvailable = text.substring(0, 4) === 'CODE';
    if (isCodeAvailable) {
      if (text.length >= 10) {
        const dataToSend = {...task, taskId: text, status: 'COMPLETED'};
        let newAllTasks = {
          ...allTasks,
          data: mergeObject(allTasks.data, dataToSend),
        };
        callApi({task: newAllTasks});
      } else {
        showToastMessage('error', 'Length of task id must be 10 or greater');
      }
    } else {
      showToastMessage('error', "Task id should start with 'CODE'");
    }
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      showToastMessage('success', 'Successfully updated the task');
      setDataUpdated(true);
      navigation.goBack();
    }
  }, [data]);

  const showToastMessage = (type, message) => {
    Toast.show({
      type,
      position: 'bottom',
      text1: message,
    });
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#0f172a" />
      <View className="flex w-full h-full p-5">
        <View className="mb-3 flex gap-3">
          <Text className="font-bold text-black text-lg">NAME</Text>
          <Text className="italic font-semibold text-cyan-800">
            {name.toUpperCase()}
          </Text>
        </View>
        <View className="mb-3 flex gap-3">
          <Text className="font-bold text-black text-lg">LOCATION</Text>
          <Text className="italic font-semibold text-cyan-800">
            {location.toUpperCase()}
          </Text>
        </View>
        <View className="mb-3 flex gap-3">
          <Text className="font-bold text-black text-lg">STATUS</Text>
          <Text className="italic font-semibold text-cyan-800">
            {status.toUpperCase()}
          </Text>
        </View>
        <View className="mb-3 flex gap-3">
          <Text className="font-bold text-black text-lg">TASK ID</Text>
          <TextInput
            className="bg-slate-400 rounded-lg text-black px-3"
            value={text}
            onChangeText={val => {
              setText(val);
            }}
          />
        </View>
        <Button title="SUBMIT" color={'#1e293b'} onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default TaskDetails;
