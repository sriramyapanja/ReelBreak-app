/**
 * Mindful Score — points for awareness + action, not abstinence.
 */

export const POINTS = {
  LOG_REEL_SESSION: 2,
  SELECT_MOOD: 2,
  CHOOSE_INTERVENTION: 3,
  COMPLETE_INTERVENTION: 5,
  EARLY_INTERRUPTION_BONUS: 2,
} as const;

export type MoodType = 'sad' | 'anxious' | 'bored' | 'okay' | 'calm' | 'happy' | 'excited';

export type InterventionType =
  | '5_squats'
  | 'breathe_30'
  | 'text_friend'
  | 'one_line_reflection'
  | 'stand_stretch';

export interface SessionData {
  reelCount: number;
  mood: MoodType | null;
  choseIntervention: boolean | null;
  interventionCompleted: InterventionType | null;
  earlyInterruption: boolean;
}

export function calculateSessionPoints(data: SessionData): number {
  let total = 0;
  total += POINTS.LOG_REEL_SESSION;
  if (data.mood !== null) total += POINTS.SELECT_MOOD;
  if (data.choseIntervention === true) total += POINTS.CHOOSE_INTERVENTION;
  if (data.interventionCompleted !== null) total += POINTS.COMPLETE_INTERVENTION;
  if (data.earlyInterruption) total += POINTS.EARLY_INTERRUPTION_BONUS;
  return total;
}
