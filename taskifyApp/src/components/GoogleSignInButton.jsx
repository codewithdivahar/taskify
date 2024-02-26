import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Google from '../assets/svgs/Google';

const GoogleSignInButton = ({onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex flex-row w-full justify-center items-center bg-blue-600 px-5 py-3 rounded-lg">
      <Google />
      <Text className="text-slate-100 text-[20px] font-semibold ml-5">
        Sign in with Google
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;
