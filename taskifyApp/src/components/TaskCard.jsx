import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const TaskCard = ({name, location, status, taskId, onCardClick}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      key={name}
      onPress={onCardClick}
      className="flex w-full h-[100px] bg-slate-800 p-5 rounded-lg justify-between mb-6">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-slate-100 font-bold text-lg">{name}</Text>
        <View
          className={`px-3 py-1 rounded-lg ${
            status === 'PENDING' ? 'bg-orange-400' : 'bg-green-400'
          }`}>
          <Text className="text-slate-100">{status}</Text>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-slate-100 font-semibold text-sm">{location}</Text>
        <Text className="text-slate-100  text-sm italic">{taskId}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
