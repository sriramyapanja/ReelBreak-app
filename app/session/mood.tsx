import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PanResponder, LayoutChangeEvent, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/SessionContext';
import type { MoodType } from '@/lib/scoring';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

const MOOD_POP_SCALE = 1.3;
const ARC_HEIGHT = 150;
const LABEL_BASE_TOP = 42;
const LABEL_LIFT = 22;
const THUMB_BASE_TOP = 118;
const THUMB_LIFT = 44;

const MOODS: { id: MoodType; label: string; color: string }[] = [
  { id: 'sad', label: 'Sad', color: '#e74c3c' },
  { id: 'anxious', label: 'Anxious', color: '#f39c12' },
  { id: 'bored', label: 'Bored', color: '#f1c40f' },
  { id: 'okay', label: 'Okay', color: '#2ecc71' },
  { id: 'calm', label: 'Calm', color: '#3498db' },
  { id: 'happy', label: 'Happy', color: '#9b59b6' },
  { id: 'excited', label: 'Excited', color: '#e91e8c' },
];

const RAINBOW = ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e91e8c'] as const;

function archLift(p: number) {
  const t = (p - 0.5) * 2;
  return 1 - t * t;
}

function Sparkle({ delay, style }: { delay: number; style?: object }) {
  const opacity = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 600, useNativeDriver: true }),
      ])
    );
    const t = setTimeout(() => anim.start(), delay);
    return () => {
      clearTimeout(t);
      anim.stop();
    };
  }, [opacity, delay]);
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.white,
          opacity,
        },
        style,
      ]}
    />
  );
}

export default function MoodScreen() {
  const router = useRouter();
  const { setMood, setStep } = useSession();
  const [selectedIndex, setSelectedIndex] = useState(3);
  const trackWidth = useRef(0);
  const lastIndexRef = useRef(3);
  const popAnim = useRef(new Animated.Value(1)).current;

  const handleLayout = (e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
  };

  const triggerPop = () => {
    popAnim.setValue(1);
    Animated.sequence([
      Animated.timing(popAnim, { toValue: MOOD_POP_SCALE, duration: 120, useNativeDriver: true }),
      Animated.timing(popAnim, { toValue: 0.98, duration: 80, useNativeDriver: true }),
      Animated.timing(popAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        if (trackWidth.current > 0) {
          const x = evt.nativeEvent.locationX;
          const i = Math.round((x / trackWidth.current) * 6);
          const next = Math.max(0, Math.min(6, i));
          if (next !== lastIndexRef.current) {
            lastIndexRef.current = next;
            triggerPop();
          }
          setSelectedIndex(next);
        }
      },
      onPanResponderMove: (evt) => {
        if (trackWidth.current > 0) {
          const x = evt.nativeEvent.locationX;
          const i = Math.round((x / trackWidth.current) * 6);
          const next = Math.max(0, Math.min(6, i));
          if (next !== lastIndexRef.current) {
            lastIndexRef.current = next;
            triggerPop();
          }
          setSelectedIndex(next);
        }
      },
    })
  ).current;

  const handleNext = () => {
    setMood(MOODS[selectedIndex].id);
    setStep('intervention');
    router.replace('/session/intervention');
  };

  const thumbP = selectedIndex / 6;
  const thumbTop = THUMB_BASE_TOP - THUMB_LIFT * archLift(thumbP);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>How are you feeling?</Text>
      <View style={styles.rainbowWrap} onLayout={handleLayout} {...pan.panHandlers}>
        <LinearGradient
          colors={RAINBOW}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rainbowArc}
        />
        <Sparkle delay={0} style={{ left: '8%', top: 24 }} />
        <Sparkle delay={200} style={{ left: '24%', top: 18 }} />
        <Sparkle delay={400} style={{ left: '40%', top: 28 }} />
        <Sparkle delay={100} style={{ left: '56%', top: 14 }} />
        <Sparkle delay={300} style={{ left: '72%', top: 24 }} />
        <Sparkle delay={500} style={{ left: '88%', top: 20 }} />

        {MOODS.map((m, i) => {
          const p = i / 6;
          const y = LABEL_BASE_TOP - LABEL_LIFT * archLift(p);
          const selected = i === selectedIndex;
          return (
            <Animated.Text
              key={m.id}
              style={[
                styles.arcEmotion,
                {
                  left: `${p * 100}%` as any,
                  top: y,
                  transform: [
                    { translateX: -28 },
                    { scale: selected ? popAnim : 1 },
                  ],
                },
                selected && styles.arcEmotionSelected,
              ]}
            >
              {m.label}
            </Animated.Text>
          );
        })}

        <View style={[styles.thumb, { left: `${thumbP * 100}%` as any, top: thumbTop }]} />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleNext} activeOpacity={0.85}>
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>
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
    fontFamily: fonts.regular,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  rainbowWrap: {
    height: 230,
    position: 'relative',
    marginBottom: 20,
  },
  rainbowArc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: ARC_HEIGHT,
    borderBottomLeftRadius: 9999,
    borderBottomRightRadius: 9999,
  },
  arcEmotion: {
    position: 'absolute',
    width: 56,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.textMuted,
    zIndex: 3,
  },
  arcEmotionSelected: {
    color: colors.text,
    fontFamily: fonts.semiBold,
  },
  thumb: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.text,
    marginLeft: -22,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
});
