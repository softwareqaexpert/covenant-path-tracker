import { dailyThoughts } from '../data/content'

export default function DailyThought() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const day = Math.floor((now - start) / 86400000)
  const t = dailyThoughts[day % dailyThoughts.length]

  return (
    <div className="card" style={{ borderLeft: '3px solid #BF9000', borderRadius: 'var(--radius)' }}>
      <div className="f11 hint" style={{ marginBottom: 4 }}>Today's thought</div>
      <div className="f14" style={{ fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</div>
      <div className="f11" style={{ color: '#854F0B', marginTop: 6 }}>{t.ref}</div>
    </div>
  )
}
