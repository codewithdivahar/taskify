import {Text, View, Linking, Platform, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import GoogleSignInButton from '../components/GoogleSignInButton';
import SafariView from 'react-native-safari-view';
import {SERVER_URL} from '../constants/urls';

const Login = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    Linking.addEventListener('url', handleOpenURL);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleOpenURL({url});
      }
    });
    return () => {
      Linking.removeAllListeners('url', handleOpenURL);
    };
  }, []);

  const handleOpenURL = url => {
    console.log('Callback Url ------->', url);

    navigation.navigate('task');

    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  const handleGoogleSignIn = url => {
    console.log('Google SignIn');
    if (Platform.OS === 'ios') {
      SafariView.show({
        url,
        fromBottom: true,
      });
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <>
      <View className="flex w-full h-screen bg-slate-700 justify-center items-center">
        <Text className="mb-8 text-[36px] font-semibold text-slate-100">
          Taskify
        </Text>
        <GoogleSignInButton
          onPress={() =>
            handleGoogleSignIn(SERVER_URL + '/auth/google?deviceType=mobile')
          }
        />
      </View>
    </>
  );
};

export default Login;
