import SessionBadge from './components/SessionBadge'
import TomatoProgress from './components/TomatoProgress'
import { usePomodoro } from './hooks/usePomodoro'

export default function App() {
  const {
    mode,
    status,
    secondsLeft,
    sessionCount,
    start,
    pause,
    restartFocus,
  } = usePomodoro()

  return (
    <main className="companion-shell drag-region">
      <div className="companion-stack">
        <TomatoProgress
          mode={mode}
          secondsLeft={secondsLeft}
          status={status}
          onStart={start}
          onPause={pause}
          onRestart={restartFocus}
        />

        <div className="no-drag flex flex-col items-center gap-1">
          <SessionBadge count={sessionCount} />
        </div>
      </div>
    </main>
  )
}
