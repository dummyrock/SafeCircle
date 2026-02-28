import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useNotifications } from '@/hooks/use-notifications';

export default function CommunityScreen() {
  const { notifications } = useNotifications();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerRow}>
        <ThemedText type="title">Community</ThemedText>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Every time you tap the popup button, a notification appears here.
      </ThemedText>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <ThemedText style={styles.emptyText}>No notifications yet.</ThemedText>
        ) : (
          notifications.map((item) => (
            <ThemedView key={item.id} style={styles.card}>
              <ThemedText type="defaultSemiBold">{item.message}</ThemedText>
              <ThemedText style={styles.time}>{item.time}</ThemedText>
            </ThemedView>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 32,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  time: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.7,
  },
  emptyText: {
    opacity: 0.7,
  },
});
