import { Audio } from 'expo-av';
import { File } from 'expo-file-system';
import { useEffect, useRef, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useNotifications } from '@/hooks/use-notifications';

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const AUDIO_DURATION_MS = 30_000;

async function summarizeWithGemini(audioBase64: string, mimeType: string) {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing EXPO_PUBLIC_GEMINI_API_KEY');
  }

  const response = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text:
                'Rewrite this audio as a brief first-person transcript, as if the speaker is talking. Focus on health issues and the main contributing factors mentioned. Keep it to 1-2 sentences, do not invent details, and if it is not about health respond with exactly "NO_HEALTH".',
            },
            {
              inlineData: {
                mimeType,
                data: audioBase64,
              },
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const summary = data?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? '')
    .join('')
    .trim();

  if (!summary) {
    throw new Error('Gemini returned an empty summary.');
  }

  return summary;
}

export default function HomeScreen() {
  const { addNotification } = useNotifications();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync().catch(() => null);
        recordingRef.current = null;
      }
    };
  }, []);

  const stopAndSummarize = async () => {
    const recording = recordingRef.current;
    if (!recording) {
      setIsRecording(false);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    recordingRef.current = null;
    setIsRecording(false);
    setIsProcessing(true);

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (!uri) {
        addNotification('No audio captured.');
        return;
      }

      const mimeType = Platform.select({
        ios: 'audio/mp4',
        android: 'audio/3gpp',
        default: 'audio/mp4',
      });

      const audioBase64 = await new File(uri).base64();

      const summary = await summarizeWithGemini(audioBase64, mimeType ?? 'audio/mp4');
      if (summary !== 'NO_HEALTH') {
        addNotification(summary);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown error while summarizing audio.';
      addNotification(`Summary failed: ${message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleHelpPress = async () => {
    if (isProcessing) {
      return;
    }

    if (isRecording) {
      await stopAndSummarize();
      return;
    }

    const permission = await Audio.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('SafeCircle', 'Microphone permission is required to record help audio.');
      return;
    }

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();

      recordingRef.current = recording;
      setIsRecording(true);

      timeoutRef.current = setTimeout(() => {
        void stopAndSummarize();
      }, AUDIO_DURATION_MS);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to start audio recording.';
      Alert.alert('SafeCircle', message);
      setIsRecording(false);
      recordingRef.current = null;
    }
  };

  const isDisabled = isProcessing;

  return (
    <ThemedView style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled }}
        disabled={isDisabled}
        onPress={handleHelpPress}
        style={({ pressed }) => [
          styles.popupButton,
          isDisabled && styles.popupButtonDisabled,
          pressed && !isDisabled && styles.popupButtonPressed,
        ]}>
        <ThemedText type="title" style={styles.popupButtonText}>
          {isRecording ? 'STOP' : isProcessing ? 'PROCESSING' : 'HELP'}
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
  popupButtonDisabled: {
    opacity: 0.6,
  },
  popupButtonText: {
    color: '#ffffff',
    textTransform: 'uppercase',
  },
});
