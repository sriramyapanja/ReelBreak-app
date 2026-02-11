import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/SessionContext';
import { colors } from '@/theme/colors';

export default function ReelCountScreen() {
  const router = useRouter();
  const { session, setReelCount, setStep } = useSession();
  const count = session.reelCount;
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const stopHold = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const startHold = (delta: number) => {
    const next = Math.max(0, countRef.current + delta);
    countRef.current = next;
    setReelCount(next);
    stopHold();
    holdTimerRef.current = setInterval(() => {
      const nextCount = Math.max(0, countRef.current + delta);
      countRef.current = nextCount;
      setReelCount(nextCount);
    }, 120);
  };

  useEffect(() => stopHold, []);

  const handleLog = () => {
    setStep('mood');
    router.replace('/session/mood');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>How many reels this session?</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => startHold(-1)}
          onPressOut={stopHold}
        >
          <Text style={styles.buttonText}>−1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => startHold(1)}
          onPressOut={stopHold}
        >
          <Text style={styles.buttonText}>+1</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.undo} onPress={() => setReelCount(Math.max(0, count - 1))}>
        <Text style={styles.undoText}>Undo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.primaryButton} onPress={handleLog} activeOpacity={0.85}>
        <Text style={styles.primaryButtonText}>Log</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  label: {
    fontSize: 18,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  count: {
    fontSize: 72,
    fontWeight: '200',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 24,
    color: colors.text,
  },
  undo: {
    alignSelf: 'center',
    marginBottom: 48,
  },
  undoText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
});
