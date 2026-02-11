import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

const AFFIRMATIONS = [
  'You noticed.',
  'That was enough.',
  'Want to try something small?',
  'One step is still a step.',
  'You showed up.',
];

interface CactusProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  messageMuted?: boolean;
}

const TOP = colors.accent;
const BODY = colors.success;
const POT = '#B85C38';
const POT_DARK = '#9A4A2E';

export function Cactus({ message, size = 'medium', messageMuted = false }: CactusProps) {
  const pulse = useRef(new Animated.Value(1)).current;
  const bounce = useRef(new Animated.Value(0)).current;
  const msg = message ?? AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
  const scale = size === 'small' ? 0.7 : size === 'large' ? 1.4 : 1;

  useEffect(() => {
    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.02, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    );
    const bounceAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: -6, duration: 1000, useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    );
    pulseAnim.start();
    bounceAnim.start();
    return () => {
      pulseAnim.stop();
      bounceAnim.stop();
    };
  }, [pulse, bounce]);

  const w = size === 'large' ? 56 : size === 'small' ? 32 : 44;
  const headR = w * 0.22;
  const bodyH = w * 0.9;
  const bodyW = w * 0.55;
  const eyeSize = w * 0.18;
  const pupilSize = w * 0.08;
  const potH = w * 0.35;

  return (
    <View style={[styles.wrap, { transform: [{ scale }] }]}>
      <Animated.View style={[styles.cactus, { transform: [{ translateY: bounce }, { scale: pulse }] }]}>
        {/* Mario-style: round head (flower) */}
        <View style={[styles.head, { width: headR * 2, height: headR * 2, borderRadius: headR, backgroundColor: TOP }]} />
        {/* Rounded body */}
        <View style={[styles.body, { width: bodyW, height: bodyH, borderRadius: bodyW / 2, backgroundColor: BODY }]} />
        {/* Expressive eyes: white + pupil + highlight */}
        <View style={[styles.eyes, { marginTop: -bodyH * 0.7 }]}>
          <View style={[styles.eyeOuter, { width: eyeSize, height: eyeSize, borderRadius: eyeSize / 2 }]}>
            <View style={[styles.pupil, { width: pupilSize, height: pupilSize, borderRadius: pupilSize / 2, backgroundColor: colors.text, left: (eyeSize - pupilSize) / 2, top: (eyeSize - pupilSize) / 2 }]} />
            <View style={[styles.eyeHighlight, { width: pupilSize * 0.5, height: pupilSize * 0.5, borderRadius: pupilSize / 4, left: (eyeSize - pupilSize) / 2 + pupilSize * 0.3, top: (eyeSize - pupilSize) / 2 - 1 }]} />
          </View>
          <View style={[styles.eyeOuter, { width: eyeSize, height: eyeSize, borderRadius: eyeSize / 2 }]}>
            <View style={[styles.pupil, { width: pupilSize, height: pupilSize, borderRadius: pupilSize / 2, backgroundColor: colors.text, left: (eyeSize - pupilSize) / 2, top: (eyeSize - pupilSize) / 2 }]} />
            <View style={[styles.eyeHighlight, { width: pupilSize * 0.5, height: pupilSize * 0.5, borderRadius: pupilSize / 4, left: (eyeSize - pupilSize) / 2 + pupilSize * 0.3, top: (eyeSize - pupilSize) / 2 - 1 }]} />
          </View>
        </View>
        {/* Smile */}
        <View style={[styles.smileWrap, { marginTop: -bodyH * 0.35 }]}>
          <View style={[styles.smile, { width: bodyW * 0.5, height: bodyW * 0.2, borderTopLeftRadius: bodyW * 0.25, borderTopRightRadius: bodyW * 0.25 }]} />
        </View>
        {/* Pot - rounded Mario style */}
        <View style={[styles.potWrap, { marginTop: -bodyW * 0.2 }]}>
          <View style={[styles.potTop, { width: bodyW * 0.9, height: potH * 0.5, borderRadius: 6, backgroundColor: POT }]} />
          <View style={[styles.potBottom, { width: bodyW * 1.15, height: potH * 0.6, borderRadius: 8, backgroundColor: POT }]} />
          <View style={[styles.potRim, { width: bodyW * 0.7, height: 4, borderRadius: 2, backgroundColor: POT_DARK }]} />
        </View>
      </Animated.View>
      <Text style={[styles.message, messageMuted && styles.messageMuted]}>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cactus: {
    alignItems: 'center',
  },
  head: {
    marginBottom: -2,
  },
  body: {
    alignSelf: 'center',
  },
  eyes: {
    flexDirection: 'row',
    gap: 10,
  },
  eyeOuter: {
    backgroundColor: colors.white,
    position: 'relative',
  },
  pupil: {
    position: 'absolute',
  },
  eyeHighlight: {
    position: 'absolute',
    backgroundColor: colors.white,
  },
  smileWrap: {
    alignItems: 'center',
  },
  smile: {
    borderWidth: 2,
    borderColor: colors.text,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
  },
  potWrap: {
    alignItems: 'center',
  },
  potTop: {
    marginBottom: -4,
  },
  potBottom: {
    marginBottom: -6,
  },
  potRim: {},
  message: {
    marginTop: 20,
    fontSize: 17,
    fontFamily: fonts.regular,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  messageMuted: {
    color: colors.textMuted,
  },
});
