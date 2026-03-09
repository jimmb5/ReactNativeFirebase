# Simple React Native weather app with firebase integration

### How to setup
* Create .env in project root folder
* Get openweather API key from https://home.openweathermap.org/
* Paste API key to EXPO_PUBLIC_WEATHER_API_KEY variable (Not safe for production)
* Create project to firebase
  * Add web app to the project
  * Copy the following firebase config fields to .env:
    '
    EXPO_PUBLIC_FIREBASE_API_KEY=
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
    EXPO_PUBLIC_FIREBASE_PROJECT_ID=
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    EXPO_PUBLIC_FIREBASE_APP_ID=
    '
  * Add firestore database to the project
   - Add index with fields deviceId (Ascending) and fetchedAt (Descending)

### Features
* Fetch weather data based on GPS location
* Fetch for another location weather by using search bar
* History saves based on device
* Explore your history, delete history.
