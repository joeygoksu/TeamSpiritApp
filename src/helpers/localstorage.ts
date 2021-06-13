import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from './logger';

const _storeData = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    logger.log(error);
  }
};

const _retrieveData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    logger.log(error);
  }
};

export { _storeData, _retrieveData };
