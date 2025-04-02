import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';

// ** Utils
import {showToast} from '../../utils/utils';
import {navigateTo} from '../../navigation/utils';

// ** Third Party Packages
import AsyncStorage from '@react-native-async-storage/async-storage';

// ** Types
interface JwtConfig {
  [key: string]: any;
}

export default class JwtService {
  jwtConfig: JwtConfig = {};

  constructor(jwtOverrideConfig: JwtConfig) {
    this.jwtConfig = {...this.jwtConfig, ...jwtOverrideConfig};

    axios.interceptors.request.use(
      async (
        config: InternalAxiosRequestConfig,
      ): Promise<InternalAxiosRequestConfig> => {
        const token = await AsyncStorage.getItem('token');
        if (config.headers) {
          config.headers.Connection = 'keep-alive';
          config.headers['Content-Type'] = 'application/json';
          config.headers['Access-Control-Request-Method'] = '*';
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error: any) => Promise.reject(error),
    );

    axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: any) => {
        const {response} = error;
        if (response && response.status === 401) {
          await this.removeData('token');
          navigateTo('Auth');
        }

        return Promise.reject(error);
      },
    );
  }

  // ** DONE: Async Storage items has been set
  getData = async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      showToast({
        title: 'Fetch token',
        message: 'Failed to fetch token',
        type: 'error',
      });
      return null;
    }
  };

  setData = async (key: string, value: string): Promise<void> => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (e) {
      showToast({
        title: 'Set token',
        message: 'Failed to set token',
        type: 'error',
      });
    }
  };

  removeData = async (key: string): Promise<void> => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      showToast({
        title: 'Remove token',
        message: 'Failed to remove token',
        type: 'error',
      });
    }
  };

  getAllData = async (): Promise<string[]> => {
    let keys: readonly string[] = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      return [...keys]; // Convert readonly array to regular array
    } catch (e) {
      showToast({
        title: 'Get all data',
        message: 'Failed to get all data',
        type: 'error',
      });
    }

    return [];
  };

  clearAllData = async (): Promise<void> => {
    try {
      return await AsyncStorage.clear();
    } catch (e) {
      showToast({
        title: 'Clear all data',
        message: 'Failed to clear all data',
        type: 'error',
      });
    }
  };
}
