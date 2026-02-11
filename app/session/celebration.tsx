import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/SessionContext';
import { Cactus } from '@/components/Cactus';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export default function CelebrationScreen() {
  const router = useRouter();
  const { resetSession } = useSession();

  const handleBack = () => {
    resetSession();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Cactus message="Yayy you finished!" size="large" />
      <TouchableOpacity style={styles.button} onPress={handleBack} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Back to dashboard</Text>
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
  button: {
    marginTop: 28,
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
});
