const SESSION_COUNT_KEY = 'pomopal-session-count'
const SESSION_DATE_KEY = 'pomopal-session-date'

function todayString(): string {
  return new Date().toISOString().slice(0, 10)
}

/** Read today's completed focus session count from localStorage. */
export function getSessionCount(): number {
  try {
    const savedDate = localStorage.getItem(SESSION_DATE_KEY)
    const today = todayString()

    if (savedDate !== today) {
      return 0
    }

    const count = localStorage.getItem(SESSION_COUNT_KEY)
    return count ? parseInt(count, 10) : 0
  } catch {
    return 0
  }
}

/** Save today's completed focus session count to localStorage. */
export function saveSessionCount(count: number): void {
  try {
    localStorage.setItem(SESSION_DATE_KEY, todayString())
    localStorage.setItem(SESSION_COUNT_KEY, String(count))
  } catch {
    // localStorage may be unavailable in some environments
  }
}
