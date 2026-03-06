import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, ScrollView } from 'react-native';
import { fetchWeatherByCoordinates, fetchWeatherByCity, WeatherData } from './services/weatherApi';
import WeatherDataComponent from './components/WeatherComponent';
import SearchBar from './components/SearchBar';
import { getCurrentLocation } from './services/location';

export default function App() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
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
    } catch (error) {
      setError('City not found or weather fetching failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      loadWeather();
    }
  }, [location]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar onSearch={handleCitySearch} isLoading={isLoading} />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {isLoading && !weatherData && (
        <Text style={styles.loadingText}>Loading weather...</Text>
      )}
      
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
