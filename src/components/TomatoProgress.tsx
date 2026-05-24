import { PointerEvent, useEffect, useMemo, useRef, useState } from 'react'
import {
  getTomatoImageSrc,
  getTomatoStageForTimer,
  TOMATO_STAGE_SRC,
} from '../constants/tomatoStages'
import { TimerMode, TimerStatus } from '../types'
import { formatTime } from '../utils/formatTime'

interface TomatoProgressProps {
  mode: TimerMode
  secondsLeft: number
  status: TimerStatus
  onStart: () => void
  onPause: () => void
  onRestart: () => void
}

interface PointerDragState {
  pointerId: number
  startX: number
  startY: number
  lastX: number
  lastY: number
  didDrag: boolean
}

const DRAG_THRESHOLD_PX = 5

export default function TomatoProgress({
  mode,
  secondsLeft,
  status,
  onStart,
  onPause,
  onRestart,
}: TomatoProgressProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const dragStateRef = useRef<PointerDragState | null>(null)
  const stage = useMemo(
    () => getTomatoStageForTimer(mode, secondsLeft),
    [mode, secondsLeft],
  )
  const src = getTomatoImageSrc(stage)

  useEffect(() => {
    Object.values(TOMATO_STAGE_SRC).forEach((path) => {
      const img = new Image()
      img.src = path
    })
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const handlePointerDown = (event: globalThis.PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setIsMenuOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  const label =
    mode === 'focus'
      ? `Focus progress: peeling stage ${stage} of 6`
      : 'Break: tomato fully peeled'

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return

    event.currentTarget.setPointerCapture(event.pointerId)
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.screenX,
      startY: event.screenY,
      lastX: event.screenX,
      lastY: event.screenY,
      didDrag: false,
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    const totalDeltaX = event.screenX - dragState.startX
    const totalDeltaY = event.screenY - dragState.startY
    const hasPassedThreshold =
      Math.hypot(totalDeltaX, totalDeltaY) > DRAG_THRESHOLD_PX

    if (!dragState.didDrag && !hasPassedThreshold) return

    const deltaX = event.screenX - dragState.lastX
    const deltaY = event.screenY - dragState.lastY

    dragState.didDrag = true
    dragState.lastX = event.screenX
    dragState.lastY = event.screenY
    setIsMenuOpen(false)
    window.electronAPI?.moveWindow(deltaX, deltaY)
  }

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    dragStateRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)

    if (!dragState.didDrag) {
      setIsMenuOpen((isOpen) => !isOpen)
    }
  }

  const handlePointerCancel = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) return
    dragStateRef.current = null
  }

  const handleStartPause = () => {
    if (status === 'running') {
      onPause()
    } else {
      onStart()
    }
    setIsMenuOpen(false)
  }

  const handleRestart = () => {
    onRestart()
    setIsMenuOpen(false)
  }

  const handleQuit = () => {
    window.electronAPI?.quitApp()
  }

  return (
    <div
      ref={rootRef}
      className={`tomato-progress no-drag ${
        isMenuOpen ? 'tomato-progress--menu-open' : ''
      }`}
    >
      <button
        type="button"
        className="tomato-progress-button"
        aria-label={`${label}. Open tomato options or drag to move window.`}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <img
          src={src}
          alt=""
          className="tomato-progress-img"
          draggable={false}
        />
      </button>

      {isMenuOpen ? (
        <div className="tomato-options-menu" role="menu">
          <button
            type="button"
            role="menuitem"
            aria-label={status === 'running' ? 'Pause timer' : 'Start timer'}
            title={status === 'running' ? 'Pause' : 'Start'}
            onClick={handleStartPause}
          >
            {status === 'running' ? '⏸' : '▶'}
          </button>
          <button
            type="button"
            role="menuitem"
            aria-label="Restart timer"
            title="Restart"
            onClick={handleRestart}
          >
            ↺
          </button>
          <button
            type="button"
            role="menuitem"
            aria-label="Quit app"
            title="Quit"
            onClick={handleQuit}
          >
            ×
          </button>
        </div>
      ) : null}

      {isMenuOpen ? (
        <time
          className="tomato-click-time font-display font-semibold tabular-nums tracking-wide"
          dateTime={`PT${secondsLeft}S`}
        >
          {formatTime(secondsLeft)}
        </time>
      ) : null}
    </div>
  )
}
