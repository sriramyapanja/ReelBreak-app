/**
 * ReelBreak — calm, low-contrast palette.
 * Single accent (terracotta) for CTAs and the cactus.
 */

export const colors = {
  background: '#F5F0E8',   // warm sand / off-white
  surface: '#EDE8E0',     // slightly darker for cards
  text: '#4A453E',        // warm brown, low contrast
  textMuted: '#7A756E',
  accent: '#C47B5B',      // terracotta — only bright accent (cactus top, primary actions)
  accentMuted: '#A86A4D',
  border: '#E0DBD2',
  success: '#6B8F71',     // calm green (no bright green)
  white: '#FFFFFF',
} as const;
