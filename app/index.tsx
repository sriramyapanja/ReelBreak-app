import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';
import { CactusRunnerGame } from '@/components/CactusRunnerGame';
import { Cactus } from '@/components/Cactus';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.gameSection}>
        <CactusRunnerGame />
      </View>
      <View style={styles.offlineMsg}>
        <Text style={styles.offlineTitle}>Awesome you're offline...</Text>
        <Text style={styles.tryLabel}>Try:</Text>
        <Text style={styles.offlineBullet}>• Turning on your airplane mode</Text>
        <Text style={styles.offlineBullet}>• Turning off mobile data or Wi‑Fi</Text>
        <Text style={styles.offlineBullet}>• Checking in on the people in the house</Text>
      </View>
      <View style={styles.greeting}>
        <Cactus message="Hello! I'm Mami, your little mindfulness plant buddy. Are you ready to log?" size="large" messageMuted />
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/session/reel')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Log reels</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  gameSection: {
    marginBottom: 0,
  },
  offlineMsg: {
    backgroundColor: colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 0,
  },
  offlineTitle: {
    fontSize: 22,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 28,
  },
  tryLabel: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text,
    marginBottom: 8,
  },
  offlineBullet: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 4,
    paddingLeft: 4,
  },
  greeting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 48,
    marginTop: 24,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
});
