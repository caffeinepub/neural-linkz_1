# Neural Linkz — Dynamic Benchmarks

## Current State
BenchmarksPage in App.tsx uses fully hardcoded static data arrays (arenaData, intelligenceData, openSourceData, arenaHighlights, etc.) with no fetching or refresh logic. "Last updated: March 2026" badge is static text.

## Requested Changes (Diff)

### Add
- `useBenchmarkData` custom hook: on mount + on manual trigger, attempt fetch from a public CORS-friendly endpoint (try Hugging Face LMArena space API or a known public JSON). On failure, fall back to the hardcoded March 2026 snapshot.
- "Refresh Data" glass button in the Benchmarks hero area — shows a spinner while loading.
- "Auto-refresh every 12 hours" toggle (stores timer, refreshes data if toggled on).
- Dynamic "Last updated" timestamp that reflects when data was last fetched/refreshed.
- Status message: if fetch fails, show "Latest data from March 2026 — click Refresh" in a small muted pill.
- Updated disclaimer: "Scores update frequently on public leaderboards (LMArena, Artificial Analysis). Data fetched client-side."

### Modify
- BenchmarksPage: consume data from the hook instead of inline constants. All tables and highlight cards render from hook state.
- "Last updated" badge shows the actual last-fetched timestamp.

### Remove
- Nothing removed. All glass styling, animations, mobile layout, sortable table, ELO bars untouched.

## Implementation Plan
1. Create `useBenchmarkData` hook with: loading state, lastUpdated timestamp, fetchSource label, data state, refresh() function, autoRefresh toggle.
2. Fetch strategy: try `https://huggingface.co/spaces/lmarena-ai/chatbot-arena` API or equivalent public JSON; CORS will likely block it — catch and fall back to snapshot immediately.
3. Fallback snapshot = existing hardcoded March 2026 data.
4. Refresh button: glass button with spinner icon, disabled while loading.
5. Auto-refresh toggle: small pill toggle that sets a 12-hour interval when on.
6. Status pill: shows source + timestamp, or fallback message.
7. Keep all existing Framer Motion animations, glass styling, ELO bars, sortable table, mobile layout exactly as-is.
