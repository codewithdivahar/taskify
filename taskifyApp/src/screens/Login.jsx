import {Text, View, Platform, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import GoogleSignInButton from '../components/GoogleSignInButton';
import SafariView from 'react-native-safari-view';
import {WebView} from 'react-native-webview';
import {CALLBACK_URL, SERVER_URL} from '../constants/urls';
import {useAuth} from '../context/Auth';

const Login = ({navigation}) => {
  const [uri, setUri] = useState('');
  const webViewRef = useRef(null);
  const {getCookieFromUrl, setCookie} = useAuth();
  let GotSSID = false;
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleGoogleSignIn = url => {
    console.log('Google SignIn');
    if (Platform.OS === 'ios') {
      SafariView.show({
        url,
        fromBottom: true,
      });
    } else {
      setUri(url);
    }
  };

  const handleNavigationStateChange = async navState => {
    if ((navState?.url).includes(CALLBACK_URL) && !GotSSID) {
      GotSSID = true;
      try {
        const cookie = await getCookieFromUrl();
        await setCookie(
          cookie['connect.sid']['name'],
          cookie['connect.sid']['value'],
        );
      } catch (err) {
        console.log('Error in setting cookies --->', err);
      }
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#0f172a" />
      {uri !== '' ? (
        <View className="flex w-full h-screen">
          <WebView
            ref={webViewRef}
            source={{uri}}
            onNavigationStateChange={handleNavigationStateChange}
            javaScriptEnabled={true}
            userAgent="mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/99.0.4844.51 safari/537.36"
            originWhitelist={['*']}
            sharedCookiesEnabled={true}
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
            cacheEnabled={false}
          />
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default Login;
