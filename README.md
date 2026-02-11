# ReelBreak 🌵

A mindfulness-driven behavioral game that transforms subconscious social media scrolling into moments of awareness, reflection, and gentle self-interruption—without restriction or shame.

**You're not competing to scroll less. You're playing to notice more.**

## Run the app

```bash
cd ReelBreak
npm install
npx expo start
```

Then press `i` for iOS simulator or `a` for Android. For web: `npx expo start --web`.

## What’s in this repo

- **Screens:** Home (dashboard) → Reel count → Mood → Intervention choice → Micro-challenges → Reward (cactus + points).
- **Scoring:** +2 log session, +2 mood, +3 choose intervention, +5 complete intervention, +2 early interruption (see `src/lib/scoring.ts`).
- **Theme:** Warm sand background, low contrast, single accent (terracotta). See `src/theme/colors.ts`.
- **Cactus:** Simple animated friend with affirmations; appears on the reward screen.

## Tech stack

- **Frontend:** Expo (React Native) with Expo Router
- **State:** React Context for session flow
- **Backend/DB:** Not included yet (Node.js + MySQL per your spec)

## Next steps you might take

- Persist Mindful Score and reel count (e.g. AsyncStorage + optional backend).
- Add 2-player mode (match with a friend, compare “who noticed more”).
- Replace the simple cactus with a Lottie animation.
- Add calm insight cards: mood → scrolling patterns, most helpful interventions, score trends.

No infinite loops. No dark patterns. No shame language. Data owned by the user.
