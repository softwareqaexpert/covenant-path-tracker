import { Link } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { overallProgress, findCurrentLesson, lessonProgress } from '../progress'
import { checkinItems } from '../data/curriculum'
import IntroBox from '../components/IntroBox.jsx'

function streakCount(checkins) {
  let n = 0
  const d = new Date()
  for (;;) {
    const key = d.toISOString().slice(0, 10)
    const day = checkins[key]
    const any = day && Object.values(day).some(Boolean)
    if (any) { n += 1; d.setDate(d.getDate() - 1) }
    else if (n === 0 && key === new Date().toISOString().slice(0, 10)) { d.setDate(d.getDate() - 1) }
    else break
  }
  return n
}

export default function Home() {
  const { state, isDone, toggleCheckin, isChecked } = useStore()
  const prof = state.profile
  const overall = overallProgress(isDone, prof)
  const current = findCurrentLesson(isDone)
  const lp = lessonProgress(current, isDone)
  const streak = streakCount(state.checkins)
  const greetName = prof.name ? `, ${prof.name.split(' ')[0]}` : ''
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div>
      <div className="between" style={{ padding: '2px 2px 14px' }}>
        <div>
          <div className="f12 hint">{today}</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Hi{greetName}</div>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <span className="pill amber"><i className="ti ti-flame" aria-hidden="true"></i> {streak}</span>
          <Link to="/settings" aria-label="Settings" style={{ color: 'var(--t2)' }}>
            <i className="ti ti-settings" style={{ fontSize: 22 }} aria-hidden="true"></i>
          </Link>
        </div>
      </div>

      <IntroBox />

      <Link to="/settings" className="card tint-blue" style={{ display: 'block' }}>
        <div className="f12" style={{ color: 'var(--blueD)' }}>Goal · temple endowment</div>
        <div className="b" style={{ fontSize: 18, color: 'var(--blueDD)', margin: '2px 0 10px' }}>
          {prof.endowmentGoal ? `By ${prof.endowmentGoal}` : 'Set your goal date'}
        </div>
        <div className="bar"><span style={{ width: `${overall.pct}%` }} /></div>
        <div className="f11" style={{ color: 'var(--blueD)', marginTop: 6 }}>{overall.pct}% of your path complete</div>
      </Link>

      <Link to={`/lessons/${current.id}`} className="card" style={{ display: 'block' }}>
        <div className="f11 hint">Continue lesson</div>
        <div className="f14 b" style={{ margin: '2px 0 8px' }}>{current.title}</div>
        <div className="dots">
          {current.principles.map((p) => (
            <span key={p.id} className={`dot ${isDone(p.id) ? 'done' : 'todo'}`} />
          ))}
        </div>
        <div className="f11 hint mt8">{lp.done} of {lp.total} principles</div>
      </Link>

      <div className="card">
        <div className="f11 hint" style={{ marginBottom: 6 }}>Today</div>
        {checkinItems.slice(0, 3).map((it) => (
          <div key={it.id} className="between li flat" onClick={() => toggleCheckin(it.id)}
            style={{ cursor: 'pointer' }}>
            <span className="f13">{it.label}</span>
            <i className={`ti ${isChecked(it.id) ? 'ti-circle-check ic-teal' : 'ti-circle ic-gray'}`}
              style={{ fontSize: 20 }} aria-hidden="true"></i>
          </div>
        ))}
        <Link to="/checkin" className="f12" style={{ color: 'var(--blueD)', display: 'inline-block', marginTop: 6 }}>
          All check-ins <i className="ti ti-chevron-right" aria-hidden="true"></i>
        </Link>
      </div>

      <div className="card">
        <Link to="/activities" className="between li flat"><span className="f13"><i className="ti ti-checklist" aria-hidden="true"></i> Activities & growth</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
        <Link to="/journal" className="between li flat"><span className="f13"><i className="ti ti-notebook" aria-hidden="true"></i> Journal</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
        <Link to="/settings" className="between li flat"><span className="f13"><i className="ti ti-settings" aria-hidden="true"></i> Settings</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
      </div>
    </div>
  )
}
