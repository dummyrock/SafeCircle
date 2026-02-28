import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export const useLocationTracking = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return;
      }
    })();
  }, []);

  const startTracking = async () => {
    try {
      setIsTracking(true);
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (loc) => {
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            accuracy: loc.coords.accuracy || 0,
            timestamp: loc.timestamp,
          });
        }
      );
      return subscription;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsTracking(false);
    }
  };

  const stopTracking = (subscription: Location.LocationSubscription | undefined) => {
    if (subscription) {
      subscription.remove();
    }
    setIsTracking(false);
  };

  return { location, error, isTracking, startTracking, stopTracking };
};