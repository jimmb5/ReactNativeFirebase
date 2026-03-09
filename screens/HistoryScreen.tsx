import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import getDeviceId from '../services/deviceId';
import { deleteHistoryEntry, listLatestHistory, WeatherHistoryEntry } from '../services/history';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

export default function HistoryScreen(_props: Props) {
  const [items, setItems] = useState<WeatherHistoryEntry[]>([]);

  useEffect(() => {
    getDeviceId()
      .then((id) => listLatestHistory(id))
      .then(setItems)
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteHistoryEntry(id);
      setItems((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No history yet</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.city}>{item.weather.name}</Text>
            <Text style={styles.temp}>{Math.round(item.weather.main.temp)}°C</Text>
            <Text style={styles.desc}>{item.weather.weather[0].description}</Text>
            {item.fetchedAt && (
              <Text style={styles.date}>
                {item.fetchedAt.toLocaleString('fi-FI')}
              </Text>
            )}
            <Button title="Delete" onPress={() => handleDelete(item.id)} color="#d32f2f" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
  card: {
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  city: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 18,
    color: '#2196F3',
    marginTop: 4,
  },
  desc: {
    marginTop: 4,
    color: '#444',
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
});
