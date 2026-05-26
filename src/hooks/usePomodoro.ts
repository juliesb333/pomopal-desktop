import { useCallback, useEffect, useState } from 'react'
import {
  BREAK_DURATION_SECONDS,
  FOCUS_DURATION_SECONDS,
  TimerMode,
  TimerStatus,
} from '../types'
import { getSessionCount, saveSessionCount } from '../utils/storage'

interface UsePomodoroReturn {
  mode: TimerMode
  status: TimerStatus
  secondsLeft: number
  sessionCount: number
  start: () => void
  pause: () => void
  reset: () => void
  restartFocus: () => void
}

function getDurationForMode(mode: TimerMode): number {
  return mode === 'focus' ? FOCUS_DURATION_SECONDS : BREAK_DURATION_SECONDS
}

export function usePomodoro(): UsePomodoroReturn {
  const [mode, setMode] = useState<TimerMode>('focus')
  const [status, setStatus] = useState<TimerStatus>('idle')
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_DURATION_SECONDS)
  const [sessionCount, setSessionCount] = useState(getSessionCount)

  const handleTimerComplete = useCallback(() => {
    if (mode === 'focus') {
      const newCount = getSessionCount() + 1
      saveSessionCount(newCount)
      setSessionCount(newCount)
    }

    setStatus('idle')
    setSecondsLeft(0)
  }, [mode])

  useEffect(() => {
    if (status !== 'running') return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          handleTimerComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [status, handleTimerComplete])

  const start = useCallback(() => {
    if (secondsLeft <= 0) {
      setMode('focus')
      setSecondsLeft(FOCUS_DURATION_SECONDS)
    }

    setStatus('running')
  }, [secondsLeft])

  const pause = useCallback(() => {
    setStatus('paused')
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setSecondsLeft(getDurationForMode(mode))
  }, [mode])

  const restartFocus = useCallback(() => {
    setMode('focus')
    setStatus('idle')
    setSecondsLeft(FOCUS_DURATION_SECONDS)
  }, [])

  return {
    mode,
    status,
    secondsLeft,
    sessionCount,
    start,
    pause,
    reset,
    restartFocus,
  }
}
