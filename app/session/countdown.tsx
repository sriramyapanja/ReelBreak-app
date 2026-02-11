import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';
import { Cactus } from '@/components/Cactus';

const PHASES = [
  { label: 'Breathe in', seconds: 8, detail: 'for 8 seconds' },
  { label: 'Hold', seconds: 4 },
  { label: 'Breathe out', seconds: 8, detail: 'for 8 seconds' },
];
const ROUNDS = 3;

export default function CountdownScreen() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState(0);
  const [seconds, setSeconds] = useState(PHASES[0].seconds);
  const [readyToFinish, setReadyToFinish] = useState(false);

  useEffect(() => {
    if (!started || readyToFinish) return;
    if (seconds <= 0) {
      const nextPhase = phase + 1;
      if (nextPhase >= PHASES.length) {
        if (round + 1 >= ROUNDS) {
          setReadyToFinish(true);
          return;
        }
        setRound((r) => r + 1);
        setPhase(0);
        setSeconds(PHASES[0].seconds);
      } else {
        setPhase(nextPhase);
        setSeconds(PHASES[nextPhase].seconds);
      }
      return;
    }
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [started, readyToFinish, round, phase, seconds]);

  const handleFinish = () => {
    router.replace('/session/finish?type=breathe_30');
  };

  const handleReady = () => {
    setStarted(true);
    setRound(0);
    setPhase(0);
    setSeconds(PHASES[0].seconds);
  };

  if (!started) {
    return (
      <View style={styles.container}>
        <Cactus
          size="large"
          message="We will do 3 rounds: breathe in for 8 seconds, pause 4 seconds, and breathe out for 8 seconds. Repeat 3 times. Are you ready to start?"
        />
        <TouchableOpacity style={styles.button} onPress={handleReady} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Ready</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (readyToFinish) {
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

  const current = PHASES[phase];

  return (
    <View style={styles.container}>
      <Text style={styles.phase}>{current.label}</Text>
      <Text style={styles.sublabel}>{current.detail ?? 'for 4 seconds'}</Text>
      <Text style={styles.round}>Round {round + 1} of {ROUNDS}</Text>
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
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.textMuted,
    marginBottom: 16,
  },
  phase: {
    fontSize: 52,
    fontFamily: fonts.semiBold,
    color: colors.accent,
    marginBottom: 10,
    textAlign: 'center',
  },
  sublabel: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.textMuted,
    textAlign: 'center',
  },
  round: {
    marginTop: 16,
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textMuted,
  },
  button: {
    marginTop: 24,
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
