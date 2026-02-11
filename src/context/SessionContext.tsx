import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MoodType, InterventionType, SessionData } from '@/lib/scoring';

interface SessionState extends SessionData {
  step: 'reel' | 'mood' | 'intervention' | 'challenges' | 'reward';
}

const defaultSession: SessionState = {
  step: 'reel',
  reelCount: 0,
  mood: null,
  choseIntervention: null,
  interventionCompleted: null,
  earlyInterruption: false,
};

const LAST_REEL_COUNT_KEY = 'reelbreak:lastReelCount';

type SessionContextValue = {
  session: SessionState;
  setReelCount: (n: number) => void;
  setMood: (m: MoodType) => void;
  setChoseIntervention: (yes: boolean) => void;
  setInterventionCompleted: (i: InterventionType | null) => void;
  setEarlyInterruption: (v: boolean) => void;
  setStep: (s: SessionState['step']) => void;
  resetSession: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionState>(defaultSession);
  const [savedReelCount, setSavedReelCount] = useState(0);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(LAST_REEL_COUNT_KEY)
      .then((raw) => {
        if (!active) return;
        const parsed = Number(raw ?? '0');
        const safe = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
        setSavedReelCount(safe);
        setSession((s) => ({ ...s, reelCount: safe }));
      })
      .catch(() => {
        // Keep default 0 if storage is unavailable.
      });
    return () => {
      active = false;
    };
  }, []);

  const setReelCount = useCallback((reelCount: number) => {
    const safe = Math.max(0, reelCount);
    setSavedReelCount(safe);
    setSession((s) => ({ ...s, reelCount: safe }));
    AsyncStorage.setItem(LAST_REEL_COUNT_KEY, String(safe)).catch(() => {
      // Non-blocking persistence.
    });
  }, []);
  const setMood = useCallback((mood: MoodType) => {
    setSession((s) => ({ ...s, mood }));
  }, []);
  const setChoseIntervention = useCallback((choseIntervention: boolean) => {
    setSession((s) => ({ ...s, choseIntervention }));
  }, []);
  const setInterventionCompleted = useCallback((interventionCompleted: InterventionType | null) => {
    setSession((s) => ({ ...s, interventionCompleted }));
  }, []);
  const setEarlyInterruption = useCallback((earlyInterruption: boolean) => {
    setSession((s) => ({ ...s, earlyInterruption }));
  }, []);
  const setStep = useCallback((step: SessionState['step']) => {
    setSession((s) => ({ ...s, step }));
  }, []);
  const resetSession = useCallback(() => {
    setSession({ ...defaultSession, reelCount: savedReelCount });
  }, [savedReelCount]);

  const value: SessionContextValue = {
    session,
    setReelCount,
    setMood,
    setChoseIntervention,
    setInterventionCompleted,
    setEarlyInterruption,
    setStep,
    resetSession,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
