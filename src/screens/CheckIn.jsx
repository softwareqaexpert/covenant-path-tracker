import { useStore } from '../store.jsx'
import { checkinItems } from '../data/curriculum'

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function weekDays() {
  const now = new Date()
  const start = new Date(now)
  start.setDate(now.getDate() - now.getDay())
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

function itemStreak(checkins, itemId) {
  let n = 0
  const d = new Date()
  for (;;) {
    const key = d.toISOString().slice(0, 10)
    if (checkins[key]?.[itemId]) { n += 1; d.setDate(d.getDate() - 1) }
    else break
  }
  return n
}

export default function CheckIn() {
  const { state, toggleCheckin, isChecked } = useStore()
  const days = weekDays()
  const todayKey = new Date().toISOString().slice(0, 10)
  const wow = itemStreak(state.checkins, 'ci-wow')

  const anyStreak = itemStreak(state.checkins, 'ci-prayer')

  return (
    <div>
      <div className="between" style={{ padding: '2px 2px 12px' }}>
        <h1 className="screen-title" style={{ margin: 0 }}>Check-in</h1>
        <span className="pill amber"><i className="ti ti-flame" aria-hidden="true"></i> {anyStreak} days</span>
      </div>

      <div className="f11 hint" style={{ margin: '0 2px 6px' }}>Today</div>
      {checkinItems.map((it) => (
        <div key={it.id} className="between li" onClick={() => toggleCheckin(it.id)}>
          <span className="f14">{it.label}</span>
          <i className={`ti ${isChecked(it.id) ? 'ti-circle-check ic-teal' : 'ti-circle ic-gray'}`}
            style={{ fontSize: 20 }} aria-hidden="true"></i>
        </div>
      ))}

      <div className="card" style={{ marginTop: 12 }}>
        <div className="f11 hint" style={{ marginBottom: 4 }}>This week</div>
        <div className="week">
          {days.map((d, i) => {
            const key = d.toISOString().slice(0, 10)
            const any = state.checkins[key] && Object.values(state.checkins[key]).some(Boolean)
            const future = key > todayKey
            return (
              <div key={i} className={`d ${any ? 'on' : ''}`}>
                {DAY_LETTERS[i]}
                <i className={`i ti ${any ? 'ti-check' : 'ti-minus'}`} aria-hidden="true"></i>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card tint-teal">
        <div className="between f13 b" style={{ color: 'var(--tealD)' }}>
          <span>Word of Wisdom</span><span>day {wow}</span>
        </div>
        <div className="bar teal" style={{ margin: '8px 0' }}>
          <span style={{ width: `${Math.min(100, (wow / 30) * 100)}%` }} />
        </div>
        <div className="f11" style={{ color: 'var(--tealD)' }}>Small steps count. Keep going — record your wins.</div>
      </div>
    </div>
  )
}
