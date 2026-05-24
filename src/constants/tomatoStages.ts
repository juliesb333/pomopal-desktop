import { FOCUS_DURATION_SECONDS, TimerMode } from '../types'

export const TOMATO_STAGE_COUNT = 6

/** Public paths for each peeling stage (1 = unpeeled, 6 = fully peeled). */
export const TOMATO_STAGE_SRC: Record<number, string> = {
  1: '/assets/tomato/tomato-1.png',
  2: '/assets/tomato/tomato-2.png',
  3: '/assets/tomato/tomato-3.png',
  4: '/assets/tomato/tomato-4.png',
  5: '/assets/tomato/tomato-5.png',
  6: '/assets/tomato/tomato-6.png',
}

export type TomatoStage = 1 | 2 | 3 | 4 | 5 | 6

/**
 * Map focus progress (0–1) to peeling stage 1–6.
 *
 * | Progress      | Stage |
 * |---------------|-------|
 * | 0% – <16.7%   | 1     |
 * | 16.7 – <33.3% | 2     |
 * | 33.3 – <50%   | 3     |
 * | 50 – <66.7%   | 4     |
 * | 66.7 – <83.3% | 5     |
 * | 83.3 – 100%   | 6     |
 */
export function getTomatoStageFromProgress(progress: number): TomatoStage {
  const p = Math.min(1, Math.max(0, progress))
  const index = Math.min(TOMATO_STAGE_COUNT - 1, Math.floor(p * TOMATO_STAGE_COUNT))
  return (index + 1) as TomatoStage
}

/**
 * Focus elapsed ratio from seconds remaining on the focus timer.
 * 0 = just started (25:00), 1 = focus block finished (0:00).
 */
export function getFocusProgress(secondsLeft: number): number {
  const elapsed = FOCUS_DURATION_SECONDS - secondsLeft
  return elapsed / FOCUS_DURATION_SECONDS
}

/**
 * Which tomato image to show for the current timer state.
 */
export function getTomatoStageForTimer(
  mode: TimerMode,
  secondsLeft: number,
): TomatoStage {
  if (mode === 'break') {
    return 6
  }
  return getTomatoStageFromProgress(getFocusProgress(secondsLeft))
}

export function getTomatoImageSrc(stage: TomatoStage): string {
  return TOMATO_STAGE_SRC[stage]
}
