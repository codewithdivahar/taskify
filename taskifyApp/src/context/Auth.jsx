import CookieManager from '@react-native-cookies/cookies';
import {createContext, useContext, useEffect, useState} from 'react';

import {CALLBACK_URL, DOMAIN, HOST} from '../constants/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    const loadDataFromStorage = async () => {
      const cookieData = await AsyncStorage.getItem('@APP_SESSION_COOKIE');
      try {
        if (cookieData) {
          const data = JSON.parse(cookieData);
          await setCookie(data?.name, data.value);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log('Error in loading -->', err);
      }
    };
    loadDataFromStorage();
  }, []);

  const removeCookies = () => {
    AsyncStorage.removeItem('@APP_SESSION_COOKIE')
      .then(data => setIsAuthenticated(false))
      .catch(err => console.log('Error in removing item', err));
  };

  const getCookieFromUrl = async () => {
    try {
      return await CookieManager.get(CALLBACK_URL);
    } catch (err) {
      console.log('Error in getting cookie from url');
      return {};
    }
  };

  const setCookie = async (name, value) => {
    try {
      await CookieManager.set(HOST, {
        name,
        value,
        domain: DOMAIN,
        path: '/',
        version: '1',
      });
      await AsyncStorage.setItem(
        '@APP_SESSION_COOKIE',
        JSON.stringify({name, value}),
      );
      setIsAuthenticated(true);
    } catch (err) {
      console.log('Error in Setting Cookies', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setCookie,
        isAuthenticated,
        getCookieFromUrl,
        removeCookies,
        dataUpdated,
        setDataUpdated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export {AuthContext, AuthProvider, useAuth};
