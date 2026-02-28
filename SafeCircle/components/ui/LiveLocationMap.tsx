import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocationTracking, LocationData } from '../../hooks/useLocationTracking';
import { openAppleMaps, shareLocationLink } from '../../utils/appleMapsIntegration';

interface LiveLocationMapProps {
  onLocationUpdate?: (location: LocationData) => void;
}

export const LiveLocationMap: React.FC<LiveLocationMapProps> = ({ onLocationUpdate }) => {
  const mapRef = useRef<MapView>(null);
  const { location, error, isTracking, startTracking, stopTracking } = useLocationTracking();
  const [subscription, setSubscription] = useState<any>(null);

  const handleStartTracking = async () => {
    const sub = await startTracking();
    setSubscription(sub);
  };

  const handleStopTracking = () => {
    stopTracking(subscription);
  };

  useEffect(() => {
    if (location && onLocationUpdate) {
      onLocationUpdate(location);
    }
  }, [location, onLocationUpdate]);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    }
  }, [location]);

  const handleOpenAppleMaps = () => {
    if (location) {
      openAppleMaps({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  };

  const handleShareLocation = () => {
    if (location) {
      const shareLink = shareLocationLink({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      Alert.alert('Share Location', `Share this link: ${shareLink}`);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description={`Accuracy: ${location.accuracy.toFixed(0)}m`}
          />
        )}
      </MapView>

      <View style={styles.infoBox}>
        {location ? (
          <>
            <Text style={styles.infoText}>
              Lat: {location.latitude.toFixed(4)}
            </Text>
            <Text style={styles.infoText}>
              Lon: {location.longitude.toFixed(4)}
            </Text>
            <Text style={styles.infoText}>
              Accuracy: {location.accuracy.toFixed(0)}m
            </Text>
          </>
        ) : (
          <Text style={styles.infoText}>No location data</Text>
        )}
      </View>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isTracking && styles.buttonActive]}
          onPress={isTracking ? handleStopTracking : handleStartTracking}
        >
          <Text style={styles.buttonText}>
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !location && styles.buttonDisabled]}
          onPress={handleOpenAppleMaps}
          disabled={!location}
        >
          <Text style={styles.buttonText}>Open Apple Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !location && styles.buttonDisabled]}
          onPress={handleShareLocation}
          disabled={!location}
        >
          <Text style={styles.buttonText}>Share Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#333',
  },
  errorBox: {
    backgroundColor: '#ffcccc',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  errorText: {
    color: '#cc0000',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 8,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#FF3B30',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});