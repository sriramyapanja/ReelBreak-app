import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/SessionContext';
import { Cactus } from '@/components/Cactus';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export default function RewardScreen() {
  const router = useRouter();
  const { resetSession } = useSession();

  const handleBack = () => {
    resetSession();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Cactus size="large" message="You noticed." />
      <TouchableOpacity style={styles.primaryButton} onPress={handleBack} activeOpacity={0.85}>
        <Text style={styles.primaryButtonText}>Back to dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  primaryButton: {
    marginTop: 32,
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
});
