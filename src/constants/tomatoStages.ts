import { TimerMode } from '../types'

export const TOMATO_STAGE_COUNT = 6
const ASSET_BASE_URL = import.meta.env.BASE_URL

/** Public paths for each peeling stage (1 = unpeeled, 6 = fully peeled). */
export const TOMATO_STAGE_SRC: Record<number, string> = {
  1: `${ASSET_BASE_URL}assets/tomato/tomato-1.png`,
  2: `${ASSET_BASE_URL}assets/tomato/tomato-2.png`,
  3: `${ASSET_BASE_URL}assets/tomato/tomato-3.png`,
  4: `${ASSET_BASE_URL}assets/tomato/tomato-4.png`,
  5: `${ASSET_BASE_URL}assets/tomato/tomato-5.png`,
  6: `${ASSET_BASE_URL}assets/tomato/tomato-6.png`,
}

export type TomatoStage = 1 | 2 | 3 | 4 | 5 | 6

/**
 * Which tomato image to show for the current timer state.
 *
 * Stage 1: 25:00 to 20:01
 * Stage 2: 20:00 to 15:01
 * Stage 3: 15:00 to 10:01
 * Stage 4: 10:00 to 05:01
 * Stage 5: 05:00 to 00:01
 * Stage 6: 00:00
 */
export function getTomatoStageForTimer(
  mode: TimerMode,
  secondsLeft: number,
): TomatoStage {
  if (mode === 'break' || secondsLeft <= 0) {
    return 6
  }
  if (secondsLeft <= 5 * 60) return 5
  if (secondsLeft <= 10 * 60) return 4
  if (secondsLeft <= 15 * 60) return 3
  if (secondsLeft <= 20 * 60) return 2
  return 1
}

export function getTomatoImageSrc(stage: TomatoStage): string {
  return TOMATO_STAGE_SRC[stage]
}
