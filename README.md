# ReelBreak: Behavior Analysis App for Social Media Use

ReelBreak is a mindfulness-centered behavior analysis app that helps users notice and interrupt automatic scrolling in real time.

Core idea: **counting reels is not just logging - it is a micro-intervention**.

It works by:
- interrupting automatic behavior,
- adding friction to a frictionless feed,
- converting subconscious use into conscious awareness,
- prompting healthier coping choices without shame or restriction.

---

## PICO Framing

### Problem
Despite extensive research on social media addiction, there is still no sufficiently holistic, process-level model explaining **how compulsive social media use unfolds moment to moment**. Most studies explain who is at risk, but not how behavior progresses in daily life.

### Intervention
A real-time, context-aware app that combines:
- self-monitoring (reel counting),
- mood/context logging,
- mindfulness pause prompts,
- brief coping alternatives and intentional action steps.

### Comparison
Traditional cross-sectional or retrospective self-report approaches, and non-interactive tracking that records outcomes but does not intervene during the behavior loop.

### Outcome
Expected outcomes include:
- improved self-awareness of triggers,
- more frequent interruption of automatic scrolling,
- increased use of healthy coping responses,
- reduced compulsive use patterns over time,
- improved life satisfaction and emotional self-regulation.

---

## Core Problem Identified in the Literature

1. There is extensive empirical work, but limited integrated theory of how social media addiction develops over time.
2. Many studies are cross-sectional, limiting causal insight.
3. Existing models focus more on correlates and outcomes than step-by-step behavioral processes.
4. Overreliance on retrospective self-report misses subconscious, habitual, context-driven behavior.
5. Situational factors are under-modeled (mood, prior activity, time context, physiological state).
6. Self-regulation and mindfulness mechanisms are conceptually relevant but weakly integrated into intervention design.

This project is designed to address those gaps by capturing and shaping behavior **in the moment**, not just measuring it afterward.

---

## Current Research Gap

### 1) Process gap: "Who" vs "How"
Most studies explain vulnerability and risk factors, but fewer model how compulsive behavior actually unfolds in real-life sequences.

### 2) Measurement gap: static self-report
Retrospective surveys miss automatic behavior dynamics, trigger-response loops, and context shifts.

### 3) Context gap
Insufficient integration of immediate context (emotional state, prior activity, time, optional physiological dimensions) into explanatory models.

### 4) Intervention translation gap
Protective factors such as life satisfaction and self-regulation are identified, but rarely translated into usable, real-time intervention systems.

ReelBreak directly targets these gaps by combining longitudinal in-app behavioral traces, mood/context check-ins, and awareness-triggered micro-interventions.

---

## Intervention Model in ReelBreak

### Layer 1: Self-monitoring as micro-intervention
Counting reels creates attention redirection and habit disruption. This is an evidence-backed behavior change technique, not just passive logging.

### Layer 2: Awareness prompt
Mood selection and context reflection help users name emotional state before continuing use.

### Layer 3: Intentional pause and coping choice
Users can choose short actions (e.g., breathing, movement, social contact, reflection), adding self-regulation in real time.

### Layer 4: Positive reinforcement
A non-shaming, supportive completion flow (Mami + gentle feedback) reinforces agency and continued practice.

---

## Related Work

Prior research supports a cognitive-behavioral perspective in which problematic internet/social media use often reflects maladaptive coping rather than exposure quantity alone. Work on life satisfaction highlights emotional well-being as a protective pathway against compulsive use. However, practical systems translating this into real-time intervention are limited.

ReelBreak extends this direction by operationalizing awareness and coping in-app during live behavior, rather than only analyzing post-hoc reports.

---

## Healthy Coping Alternatives (Evidence-Informed)

Interventions in this app concept are aligned with coping categories reported in addiction recovery synthesis:
- social support-based coping,
- psychological/cognitive coping (reframing, self-talk, emotional acceptance),
- mindfulness and awareness-based coping,
- behavioral substitution and routine restructuring,
- structured/professional support pathways,
- optional values/spirituality-aligned coping for relevant users.

---

## App Flow (Current)

Home -> Reel count -> Mood arc slider -> Intervention decision -> Challenge -> Finish -> Celebration

Behavior-aware features currently implemented include:
- persistent reel count memory between sessions,
- real-time mood interaction,
- breathing protocol flow (3 rounds with readiness prompt),
- game-based interruption layer with clear end-state feedback,
- supportive non-shaming UI language.

---

## Tech Stack

### Current
- **Framework:** Expo + React Native
- **Navigation:** Expo Router
- **State:** React Context
- **UI:** React Native components + `expo-linear-gradient`
- **Typography:** Inter font (`@expo-google-fonts/inter`, `expo-font`)
- **Storage:** AsyncStorage (`@react-native-async-storage/async-storage`)
- **Game embed:** WebView (`react-native-webview`) with custom canvas logic

### Planned / Extended
- Optional backend for longitudinal analytics (e.g., Node.js + SQL/NoSQL)
- Event schema for trigger-state-action-outcome sequences
- Theory-informed analytics dashboards (pattern discovery + intervention efficacy)

---

## Run the App

```bash
cd ReelBreak
npm install
npx expo start
```

Then press:
- `i` for iOS simulator
- `a` for Android
- or run web with `npx expo start --web`

---

## Research Positioning

This project is framed as both:
1. **Theory-building** (capturing process-level behavior data), and
2. **Intervention-enabling** (real-time micro-actions that support self-regulation).

It is not only a tracker; it is a behavioral design system aimed at practical prevention and early intervention.

---

## References

- Sun, Y., & Zhang, Y. (2020). A review of theories and models applied in studies of social media addiction and implications for future research. *Addictive Behaviors, 114*, 106699. https://doi.org/10.1016/j.addbeh.2020.106699

- Longstreet, P., & Brooks, S. (2017). Life satisfaction: A key to managing Internet and social media addiction. *Technology in Society, 50*, 73-77. https://doi.org/10.1016/j.techsoc.2017.05.003

- Setiawan, A., Sahar, J., Santoso, B., Mansyur, M., & Syamsir, S. B. (2024). Coping mechanisms utilized by individuals with drug addiction in overcoming challenges during the recovery process: A qualitative meta-synthesis. *Journal of Preventive Medicine and Public Health, 57*(3), 197-211. https://doi.org/10.3961/jpmph.24.042
