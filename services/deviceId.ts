import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const DEVICE_ID_KEY = 'device_id_v1';

// tietokantaan tallennetaan laitteen perusteella, ei autentikaatiota

function generateDeviceId(): string {
  const bytes = Crypto.getRandomBytes(16);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function getDeviceId(): Promise<string> {
  const existing = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (existing) return existing;

  const created = generateDeviceId();
  await AsyncStorage.setItem(DEVICE_ID_KEY, created);
  return created;
}

export default getDeviceId;

