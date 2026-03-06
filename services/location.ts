import {getCurrentPositionAsync,requestForegroundPermissionsAsync} from 'expo-location';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const getCurrentLocation = async (): Promise<Coordinates | null> => {
  try {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const location = await getCurrentPositionAsync();
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    return null;
  }
};


