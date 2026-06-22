import { Link } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { overallProgress, findCurrentLesson, lessonProgress } from '../progress'
import { lessons } from '../data/curriculum'
import IntroBox from '../components/IntroBox.jsx'
import Onboarding from '../components/Onboarding.jsx'
import DailyThought from '../components/DailyThought.jsx'

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
  const { state, isDone } = useStore()
  const prof = state.profile
  const overall = overallProgress(isDone, prof)
  const current = findCurrentLesson(isDone)
  const lp = lessonProgress(current, isDone)
  const streak = streakCount(state.checkins)
  const greetName = prof.name ? `, ${prof.name.split(' ')[0]}` : ''
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
  const todayKey = new Date().toISOString().slice(0, 10)
  const nextVisit = lessons
    .map((l) => ({ l, s: state.schedules[l.id] }))
    .filter((x) => x.s && x.s.date && x.s.date >= todayKey)
    .sort((a, b) => a.s.date.localeCompare(b.s.date))[0] || null
  const recDays = prof.recommendExpires
    ? Math.ceil((new Date(prof.recommendExpires + 'T00:00') - new Date()) / 86400000)
    : null
  const recWarn = recDays !== null && recDays <= 60

  return (
    <div>
      <Onboarding />
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

      <DailyThought />

      {recWarn && (
        <Link to="/settings" className="card tint-amber" style={{ display: 'block' }}>
          <div className="f13 b" style={{ color: 'var(--amberD)' }}>
            <i className="ti ti-alert-triangle" aria-hidden="true"></i>{' '}
            {recDays < 0 ? 'Your temple recommend has expired' : `Temple recommend expires in ${recDays} day${recDays === 1 ? '' : 's'}`}
          </div>
          <div className="f11" style={{ color: 'var(--amberD)', marginTop: 2 }}>Renew it with your bishop and stake president.</div>
        </Link>
      )}

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

      {nextVisit && (
        <Link to={`/lessons/${nextVisit.l.id}`} className="card tint-blue" style={{ display: 'block' }}>
          <div className="row">
            <i className="ti ti-calendar-event ic-blue" style={{ fontSize: 20 }} aria-hidden="true"></i>
            <div style={{ flex: 1 }}>
              <div className="f11" style={{ color: 'var(--blueD)' }}>Next visit</div>
              <div className="f13 b" style={{ color: 'var(--blueDD)' }}>{nextVisit.l.title}</div>
              <div className="f11" style={{ color: 'var(--blueD)' }}>
                {new Date(nextVisit.s.date + 'T00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                {nextVisit.s.teacher ? ` · ${nextVisit.s.teacher}` : ''}
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="card">
        <div className="f11 hint" style={{ marginBottom: 2 }}>Learn</div>
        <Link to="/covenants" className="between li flat"><span className="f13"><i className="ti ti-heart-handshake" aria-hidden="true"></i> My covenants</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
        <Link to="/church" className="between li flat"><span className="f13"><i className="ti ti-building-church" aria-hidden="true"></i> Your first Sundays</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
        <Link to="/glossary" className="between li flat"><span className="f13"><i className="ti ti-book" aria-hidden="true"></i> Glossary</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
        <Link to="/learn" className="between li flat"><span className="f13"><i className="ti ti-award" aria-hidden="true"></i> Ordinances & blessings</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
      </div>

      <div className="card">
        <div className="f11 hint" style={{ marginBottom: 2 }}>Tools</div>
        <Link to="/activities" className="between li flat"><span className="f13"><i className="ti ti-checklist" aria-hidden="true"></i> Activities & growth</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
        <Link to="/reading" className="between li flat"><span className="f13"><i className="ti ti-book-2" aria-hidden="true"></i> Book of Mormon reading</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
        <Link to="/journal" className="between li flat"><span className="f13"><i className="ti ti-notebook" aria-hidden="true"></i> Journal</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
        <Link to="/questions" className="between li flat"><span className="f13"><i className="ti ti-help-circle" aria-hidden="true"></i> Questions for leaders</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
        <Link to="/settings" className="between li flat"><span className="f13"><i className="ti ti-settings" aria-hidden="true"></i> Settings</span><i className="ti ti-chevron-right ic-gray" aria-hidden="true"></i></Link>
      </div>
    </div>
  )
}
