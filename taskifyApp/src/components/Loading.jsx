import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View className="flex flex-row items-center">
      <ActivityIndicator size={24} color={'#0f172a'} className="mr-5" />
      <Text className="text-md font-semibold text-slate-800">
        Fetching Data
      </Text>
    </View>
  );
};

export default Loading;
