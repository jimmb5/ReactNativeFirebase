
const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

export const fetchWeatherByCoordinates = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const data = await response.json();
  return data;
};

export const fetchWeatherByCity = async (cityName: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${(cityName)}&appid=${apiKey}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const data = await response.json();
  return data;
};
