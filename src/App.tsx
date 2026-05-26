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
    <main className="companion-shell">
      <div className="companion-stack">
        <TomatoProgress
          mode={mode}
          secondsLeft={secondsLeft}
          status={status}
          onStart={start}
          onPause={pause}
          onRestart={restartFocus}
          sessionCount={sessionCount}
        />
      </div>
    </main>
  )
}
