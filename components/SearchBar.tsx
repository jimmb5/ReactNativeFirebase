import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';

interface SearchBarProps {
  onSearch: (cityName: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [cityName, setCityName] = useState('');

  const handleSearch = () => {
    if (cityName.trim()) {
      onSearch(cityName.trim());
      setCityName('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name..."
        value={cityName}
        onChangeText={setCityName}
        onSubmitEditing={handleSearch}
        editable={!isLoading}
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSearch}
        disabled={isLoading || !cityName.trim()}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
