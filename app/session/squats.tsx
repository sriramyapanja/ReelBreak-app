import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/SessionContext';
import { colors } from '@/theme/colors';

export default function SquatsScreen() {
  const router = useRouter();
  const { setInterventionCompleted, setStep } = useSession();

  const handleFinish = () => {
    setInterventionCompleted('5_squats');
    setStep('reward');
    router.replace('/session/celebration');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Do your 5 squats</Text>
      <Text style={styles.sublabel}>Tap Finish when you're done</Text>
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
    color: colors.text,
    marginBottom: 8,
  },
  sublabel: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 32,
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
    fontWeight: '600',
    color: colors.white,
  },
});
