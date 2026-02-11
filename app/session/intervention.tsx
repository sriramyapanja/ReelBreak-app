import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/SessionContext';
import { colors } from '@/theme/colors';

export default function InterventionScreen() {
  const router = useRouter();
  const { setChoseIntervention, setStep } = useSession();

  const handleChoice = (yes: boolean) => {
    setChoseIntervention(yes);
    if (yes) {
      setStep('challenges');
      router.replace('/session/challenges');
    } else {
      setStep('reward');
      router.replace('/session/reward');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Do you want a small pause?</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.buttonYes]}
          onPress={() => handleChoice(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonNo]}
          onPress={() => handleChoice(false)}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonTextNo}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  question: {
    fontSize: 22,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 48,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    maxWidth: 140,
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonYes: {
    backgroundColor: colors.accent,
  },
  buttonNo: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  buttonTextNo: {
    fontSize: 18,
    color: colors.text,
  },
});
