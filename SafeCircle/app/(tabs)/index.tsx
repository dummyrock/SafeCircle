import { Alert, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const showPopup = () => {
    Alert.alert('SafeCircle', 'This is a test popup on your phone.');
  };

  return (
    <ThemedView style={styles.container}>
      <Pressable
        accessibilityRole="button"
        onPress={showPopup}
        style={({ pressed }) => [styles.popupButton, pressed && styles.popupButtonPressed]}>
        <ThemedText type="title" style={styles.popupButtonText}>
          test pop up
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  popupButton: {
    width: '90%',
    maxWidth: 420,
    height: 140,
    backgroundColor: '#0ea5e9',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  popupButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  popupButtonText: {
    color: '#ffffff',
    textTransform: 'uppercase',
  },
});
