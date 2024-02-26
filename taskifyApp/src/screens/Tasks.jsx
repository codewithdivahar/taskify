import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {useApi} from '../services/ApiServices';
import {useAuth} from '../context/Auth';
import {useNavigation} from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import Loading from '../components/Loading';

const Tasks = () => {
  const {removeCookies, dataUpdated, setDataUpdated} = useAuth();
  const navigation = useNavigation();
  const {data: logoutData, callApi: callLogoutAPI} = useApi('logout');
  const {
    data: loginSuccessData,
    loading: loginSuccessLoading,
    callApi: callLoginSuccessAPI,
  } = useApi('loginSuccess');

  const {data: getTaskData, callApi: getTaskAPI} = useApi('getTasks');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (Object.keys(logoutData).length > 0) {
      if (logoutData.success) {
        removeCookies();
      }
    }
  }, [logoutData]);

  useEffect(() => {
    if (dataUpdated) {
      getTaskAPI();
      setDataUpdated(false);
    }
  }, [dataUpdated]);

  useEffect(() => {
    callLoginSuccessAPI();
    getTaskAPI();
  }, []);

  const onCardClick = (task, allTasks) => {
    navigation.navigate('taskDetails', {task, allTasks});
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#0f172a" />
      {loginSuccessLoading ? (
        <View className="flex h-screen items-center justify-center">
          <Loading />
        </View>
      ) : (
        <View>
          {loginSuccessData?.user && (
            <View className="flex flex-row w-full h-[48px] bg-slate-800 items-center px-4 justify-between">
              <Text className="text-lg text-cyan-600 font-semibold">
                Taskify
              </Text>
              <View className="flex flex-row items-center">
                <Text className="text-slate-100 mr-5 font-semibold">
                  {loginSuccessData?.user?.displayName}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={callLogoutAPI}>
                  <Text className="text-slate-100 mr-5 ">Logout</Text>
                </TouchableOpacity>
                <Image
                  className="rounded-full"
                  source={{uri: loginSuccessData?.user?.image}}
                  width={28}
                  height={28}
                />
              </View>
            </View>
          )}

          <View className="flex p-3">
            <Text className="font-bold text-lg text-black mb-5">All Tasks</Text>
            {Object.keys(getTaskData).length > 0 &&
              getTaskData.tasks.data.map(task => {
                const {name, location, taskId, status} = task;
                return (
                  <TaskCard
                    key={name}
                    name={name}
                    location={location}
                    taskId={taskId}
                    status={status}
                    onCardClick={() => onCardClick(task, getTaskData.tasks)}
                  />
                );
              })}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Tasks;
