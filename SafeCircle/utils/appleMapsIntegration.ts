import * as Linking from 'expo-linking';

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

export const openAppleMaps = async (coordinates: MapCoordinates) => {
  const { latitude, longitude } = coordinates;
  const appleMapsUrl = `maps://maps.apple.com/?ll=${latitude},${longitude}&q=My%20Location`;

  try {
    const supported = await Linking.canOpenURL(appleMapsUrl);
    if (supported) {
      await Linking.openURL(appleMapsUrl);
    } else {
      // Fallback to web maps
      await Linking.openURL(`https://maps.apple.com/?ll=${latitude},${longitude}`);
    }
  } catch (error) {
    console.error('Error opening Apple Maps:', error);
  }
};

export const shareLocationLink = (coordinates: MapCoordinates): string => {
  const { latitude, longitude } = coordinates;
  return `https://maps.apple.com/?ll=${latitude},${longitude}`;
};