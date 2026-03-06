import { StyleSheet, Text, View } from 'react-native';
import { WeatherData as WeatherDataType } from '../services/weatherApi';

interface WeatherDataProps {
  data: WeatherDataType;
}

export default function WeatherData({ data }: WeatherDataProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>{data.name}</Text>
      
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{Math.round(data.main.temp)}°</Text>
      </View>
      
      <Text style={styles.description}>
        {data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}
      </Text>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Feels like</Text>
          <Text style={styles.detailValue}>{Math.round(data.main.feels_like)}°C</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{data.main.humidity}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
