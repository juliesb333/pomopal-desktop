interface SessionBadgeProps {
  count: number
}

export default function SessionBadge({ count }: SessionBadgeProps) {
  if (count === 0) return null

  return <p className="session-badge text-[9px] font-medium">{count} today</p>
}
