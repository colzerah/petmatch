import axios from 'axios';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { API_URL } from '@env';

const api = axios.create({
  baseURL: API_URL,
});

// Parametros padrões
api.defaults.headers.platform = Platform.OS;
api.defaults.headers.remoteId = DeviceInfo.getUniqueIdSync();
api.defaults.headers.deviceName = DeviceInfo.getDeviceNameSync();
api.defaults.headers.appId = DeviceInfo.getBundleId();

api.defaults.maxBodyLength = 10000000;
api.defaults.maxContentLength = 10000000;

export default api;
