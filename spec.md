# Neural Linkz

## Current State
App is a premium PWA AI directory. App.tsx contains the Nav, NeuralNexusOrb, and BottomSheetMenu components. HomePage.tsx contains AICard, GrokFeaturedCard, CaffeineFeaturedCard. BenchmarksPage.tsx contains useBenchmarkData hook.

## Requested Changes (Diff)

### Add
- localStorage key `nl_benchmarks_cached_data` to persist last successful fetch timestamp + source
- Clear ICP canister backend comments in useBenchmarkData hook

### Modify
1. **Reduce glimmer/shine (App.tsx)**:
   - `rimShift` keyframe glow values reduced ~50%: `0%, 100%` frame: `14px→8px`, `0.06→0.03`, `28px→16px`, `0.04→0.02`, inset `0.12→0.07`. `33%` frame: `18px→10px`, `0.09→0.04`, `32px→18px`, `0.07→0.03`, inset `0.18→0.10`. `66%` frame: `10px→6px`, `0.05→0.025`, `22px→12px`, `0.03→0.015`, inset `0.09→0.05`.
   - Orb hover `boxShadow`: reduce `rgba(255,255,255,0.2)→0.1`, `rgba(24,214,214,0.2)→0.1`, inset `0.3→0.18`
   - Bottom sheet `inset 0 1.5px 0 rgba(255,255,255,0.22)→0.12`, cyan `0.08→0.04`
   - Close orb `boxShadow`: already minimal, no change needed
   - Active nav item text-shadow: `rgba(24,214,214,0.5)→0.3`

2. **Reduce glimmer (HomePage.tsx)**:
   - Regular card icon hover `boxShadow`: `rgba(255,255,255,0.15)→0.08`, `rgba(255,255,255,0.05)→0.03`
   - Grok featured card outer `boxShadow`: `rgba(24,214,214,0.1)→0.06`, `rgba(24,214,214,0.05)→0.03`, inset `0.12→0.07`
   - Grok featured card logo hover `boxShadow`: `rgba(255,255,255,0.08)→0.05`, `rgba(255,255,255,0.03)→0.02`
   - Caffeine featured card outer `boxShadow`: `rgba(204,255,0,0.1)→0.06`, `rgba(204,255,0,0.05)→0.03`, inset `0.12→0.07`
   - Caffeine featured card logo hover: `rgba(204,255,0,0.12)→0.07`, `rgba(204,255,0,0.08)→0.04`, `rgba(204,255,0,0.05)→0.03`
   - Hero radial gradient: `rgba(24,214,214,0.06)→0.03`
   - FeaturedSection `background: rgba(24,214,214,0.12)→0.07`, border `rgba(24,214,214,0.3)→0.18`

3. **Nav transparency (App.tsx)**:
   - `background: rgba(0,0,0,0.6)` → `rgba(0,0,0,0.2)`
   - `backdropFilter: blur(30px)` → `blur(50px)`
   - `borderBottom: rgba(255,255,255,0.12)` → `rgba(255,255,255,0.07)`
   - `boxShadow` inset highlight: `rgba(255,255,255,0.05)→0.03`

4. **Benchmarks fetch logic (BenchmarksPage.tsx)**:
   - Wrap each Promise.allSettled fetch in better per-source try/catch
   - Add `localStorage.setItem('nl_benchmarks_last_success', JSON.stringify({ts: Date.now(), source}))` on successful live fetch
   - On init, read `nl_benchmarks_last_success` to restore last known source/timestamp even if interval hasn't elapsed
   - Add detailed comments throughout useBenchmarkData marking where ICP canister calls would replace each fetch
   - The 48h interval and visibilitychange logic already exists and is correct — keep it, just add clarity

### Remove
- Nothing

## Implementation Plan
1. Edit App.tsx: rimShift keyframes, orb hover boxShadow, bottom sheet inset highlight, nav background/blur/border
2. Edit HomePage.tsx: card hover glows, featured card shadows, hero radial gradient
3. Edit BenchmarksPage.tsx: improve useBenchmarkData hook with better comments, localStorage persistence of last success, cleaner error handling per source
