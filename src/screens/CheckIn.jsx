import { Link } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { checkinItems, weeklyItems, monthlyItems } from '../data/curriculum'

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const dailyIds = checkinItems.map((i) => i.id)

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
function weekKey() {
  const n = new Date()
  const s = new Date(n)
  s.setDate(n.getDate() - n.getDay())
  return 'wk-' + s.toISOString().slice(0, 10)
}
function monthKey() {
  return 'mo-' + new Date().toISOString().slice(0, 7)
}
function dailyStreak(checkins) {
  let n = 0
  const d = new Date()
  const today = new Date().toISOString().slice(0, 10)
  for (;;) {
    const k = d.toISOString().slice(0, 10)
    const any = checkins[k] && dailyIds.some((id) => checkins[k][id])
    if (any) { n += 1; d.setDate(d.getDate() - 1) }
    else if (n === 0 && k === today) { d.setDate(d.getDate() - 1) }
    else break
  }
  return n
}
function itemStreak(checkins, itemId) {
  let n = 0
  const d = new Date()
  for (;;) {
    const k = d.toISOString().slice(0, 10)
    if (checkins[k]?.[itemId]) { n += 1; d.setDate(d.getDate() - 1) }
    else break
  }
  return n
}

function Toggle({ label, checked, onClick }) {
  return (
    <div className="between li" onClick={onClick}>
      <span className="f14">{label}</span>
      <i className={`ti ${checked ? 'ti-circle-check ic-teal' : 'ti-circle ic-gray'}`}
        style={{ fontSize: 20 }} aria-hidden="true"></i>
    </div>
  )
}

export default function CheckIn() {
  const { state, toggleCheckin, isChecked } = useStore()
  const days = weekDays()
  const todayKey = new Date().toISOString().slice(0, 10)
  const wk = weekKey()
  const mo = monthKey()
  const streak = dailyStreak(state.checkins)
  const wow = itemStreak(state.checkins, 'ci-wow')
  const wowToday = isChecked('ci-wow')

  return (
    <div>
      <div className="between" style={{ padding: '2px 2px 12px' }}>
        <h1 className="screen-title" style={{ margin: 0 }}>Check-in</h1>
        <span className="pill amber"><i className="ti ti-flame" aria-hidden="true"></i> {streak} day{streak === 1 ? '' : 's'}</span>
      </div>

      <div className="f11 hint" style={{ margin: '0 2px 4px' }}>Today</div>
      {checkinItems.map((it) => (
        <Toggle key={it.id} label={it.label} checked={isChecked(it.id)} onClick={() => toggleCheckin(it.id)} />
      ))}

      <div className="card" style={{ marginTop: 12 }}>
        <div className="f11 hint" style={{ marginBottom: 4 }}>This week</div>
        <div className="week">
          {days.map((d, i) => {
            const key = d.toISOString().slice(0, 10)
            const any = state.checkins[key] && dailyIds.some((id) => state.checkins[key][id])
            return (
              <div key={i} className={`d ${any ? 'on' : ''}`}>
                {DAY_LETTERS[i]}
                <i className={`i ti ${any ? 'ti-check' : 'ti-minus'}`} aria-hidden="true"></i>
              </div>
            )
          })}
        </div>
      </div>

      <div className="f11 hint" style={{ margin: '12px 2px 4px' }}>Weekly</div>
      {weeklyItems.map((it) => (
        <Toggle key={it.id} label={it.label} checked={isChecked(it.id, wk)} onClick={() => toggleCheckin(it.id, wk)} />
      ))}

      <div className="f11 hint" style={{ margin: '12px 2px 4px' }}>This month</div>
      {monthlyItems.map((it) => (
        <Toggle key={it.id} label={it.label} checked={isChecked(it.id, mo)} onClick={() => toggleCheckin(it.id, mo)} />
      ))}

      <div className="card tint-teal" style={{ marginTop: 14 }}>
        <div className="between f13 b" style={{ color: 'var(--tealD)' }}>
          <span>Working on the Word of Wisdom?</span><span>day {wow}</span>
        </div>
        <div className="bar teal" style={{ margin: '8px 0' }}>
          <span style={{ width: `${Math.min(100, (wow / 30) * 100)}%` }} />
        </div>
        <div className="f11" style={{ color: 'var(--tealD)', marginBottom: 8 }}>
          Track your days here if you're working through it. Small steps count.
        </div>
        <button className="btn" onClick={() => toggleCheckin('ci-wow')}>
          <i className={`ti ${wowToday ? 'ti-circle-check ic-teal' : 'ti-circle'}`} aria-hidden="true"></i>
          {wowToday ? ' Kept it today — tap to undo' : ' I kept it today'}
        </button>
      </div>

      <div className="card">
        <div className="f12 muted">
          Tithing, chastity, and the Word of Wisdom are ongoing commitments — part of who you’re
          becoming, not a daily box. Reflect on them in{' '}
          <Link to="/recommend" style={{ color: 'var(--blueD)' }}>Recommend readiness</Link>.
        </div>
      </div>
    </div>
  )
}
