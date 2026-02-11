import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import type { InterventionType } from '@/lib/scoring';
import { colors } from '@/theme/colors';

const CHALLENGES: { id: InterventionType; label: string }[] = [
  { id: '5_squats', label: '5 squats' },
  { id: 'breathe_30', label: 'Breathe 30 seconds' },
  { id: 'text_friend', label: 'Text a friend' },
  { id: 'one_line_reflection', label: '1-line reflection' },
  { id: 'stand_stretch', label: 'Stand up & stretch' },
];

export default function ChallengesScreen() {
  const router = useRouter();

  const handleComplete = (id: InterventionType) => {
    if (id === 'breathe_30') {
      router.replace('/session/countdown');
      return;
    }
    if (id === '5_squats') {
      router.replace('/session/squats');
      return;
    }
    router.replace(`/session/finish?type=${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose one</Text>
      <View style={styles.list}>
        {CHALLENGES.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={styles.option}
            onPress={() => handleComplete(c.id)}
            activeOpacity={0.85}
          >
            <Text style={styles.optionText}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  label: {
    fontSize: 18,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  list: {
    gap: 12,
  },
  option: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionText: {
    fontSize: 18,
    color: colors.text,
  },
});
