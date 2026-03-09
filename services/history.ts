import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from './firebase';
import { WeatherData } from './weatherApi';

export type WeatherHistoryEntry = {
  id: string;
  deviceId: string;
  queryType: 'coords' | 'city';
  query: {
    city?: string;
    lat?: number;
    lon?: number;
  };
  weather: WeatherData;
  fetchedAt?: Date;
};

type NewHistoryEntry = Omit<WeatherHistoryEntry, 'id' | 'fetchedAt'>;

const COLLECTION_NAME = 'weatherData';

export async function saveHistoryEntry(entry: NewHistoryEntry): Promise<void> {
  await addDoc(collection(db, COLLECTION_NAME), {
    ...entry,
    fetchedAt: serverTimestamp(),
  });
}

export async function listLatestHistory(
  deviceId: string
): Promise<WeatherHistoryEntry[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('deviceId', '==', deviceId),
    orderBy('fetchedAt', 'desc'),
    limit(50)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((document) => {
    const data = document.data();
    return {
      id: document.id,
      deviceId: data.deviceId,
      queryType: data.queryType,
      query: data.query,
      weather: data.weather,
      fetchedAt: data.fetchedAt?.toDate?.(),
    } satisfies WeatherHistoryEntry;
  });
}

export async function deleteHistoryEntry(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

