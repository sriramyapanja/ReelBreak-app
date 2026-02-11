import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSession } from '@/context/SessionContext';
import type { InterventionType } from '@/lib/scoring';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

const VALID: InterventionType[] = [
  '5_squats',
  'breathe_30',
  'text_friend',
  'one_line_reflection',
  'stand_stretch',
];

export default function FinishScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string }>();
  const { setInterventionCompleted, setStep } = useSession();

  const type = VALID.includes(params.type as InterventionType)
    ? (params.type as InterventionType)
    : null;

  const handleFinish = () => {
    if (type) setInterventionCompleted(type);
    setStep('reward');
    router.replace('/session/celebration');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Great job</Text>
      <Text style={styles.sublabel}>Tap Finish when you are ready</Text>
      <TouchableOpacity style={styles.button} onPress={handleFinish} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 20,
    fontFamily: fonts.medium,
    color: colors.text,
    marginBottom: 8,
  },
  sublabel: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textMuted,
    marginBottom: 28,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 48,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
});
