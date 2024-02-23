import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Google from '../assets/svgs/Google';

const GoogleSignInButton = ({onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex flex-row justify-center items-center bg-blue-700 px-5 py-3 rounded-lg">
      <Google />
      <Text className="text-slate-100 text-[20px] font-semibold">Sign In</Text>
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({});
