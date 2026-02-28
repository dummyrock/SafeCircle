import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { LiveLocationMap } from '@/components/ui/LiveLocationMap';
import { LocationData } from '@/hooks/useLocationTracking';

export default function MapScreen() {
  const insets = useSafeAreaInsets();

  const handleLocationUpdate = (location: LocationData) => {
    console.log('Location updated:', location);
  };

  return (
    <ThemedView style={[{ flex: 1, paddingTop: Math.max(insets.top, 0) }]}>
      <LiveLocationMap onLocationUpdate={handleLocationUpdate} />
    </ThemedView>
  );
}
