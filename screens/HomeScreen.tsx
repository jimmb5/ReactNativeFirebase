import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import WeatherDataComponent from '../components/WeatherComponent';
import getDeviceId from '../services/deviceId';
import { saveHistoryEntry } from '../services/history';
import { getCurrentLocation } from '../services/location';
import { fetchWeatherByCity, fetchWeatherByCoordinates, WeatherData } from '../services/weatherApi';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      if (!coords) return;
      setLocation(coords);
    } catch (error) {
      console.error(error);
    }
  };

  const loadWeather = async () => {
    if (!location) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCoordinates(location.latitude, location.longitude);
      setWeatherData(data);
      if (deviceId) {
        saveHistoryEntry({
          deviceId,
          queryType: 'coords',
          query: { lat: location.latitude, lon: location.longitude },
          weather: data,
        });
      }
    } catch (error) {
      setError('Fetching weather failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitySearch = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(cityName);
      setWeatherData(data);
      if (deviceId) {
        saveHistoryEntry({
          deviceId,
          queryType: 'city',
          query: { city: cityName },
          weather: data,
        });
      }
    } catch (error) {
      setError('City not found or weather fetching failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDeviceId().then(setDeviceId);
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) loadWeather();
  }, [location, deviceId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Show history" onPress={() => navigation.navigate('History')} />
      <SearchBar onSearch={handleCitySearch} isLoading={isLoading} />

      {error && <Text style={styles.errorText}>{error}</Text>}

      {isLoading && !weatherData && <Text style={styles.loadingText}>Loading weather...</Text>}

      {weatherData && <WeatherDataComponent data={weatherData} />}

      <Button title="Get current location weather" onPress={getLocation} />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    marginBottom: 20,
    textAlign: 'center',
  },
});
