import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { familySteps } from '../data/curriculum'

export default function FamilyName() {
  const nav = useNavigate()
  const { isDone, toggleDone } = useStore()
  const complete = isDone('family-name')

  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Find a family name</h1>
      </div>
      <p className="screen-sub">Take one of your own ancestors to the temple for baptism. Here's how to start.</p>

      <div className="card">
        {familySteps.map((s, i) => (
          <div key={s.id} className="li flat">
            <span className="lead" style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--blue50)', color: 'var(--blueD)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{i + 1}</span>
            <span className="grow f13">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="card tint-blue">
        <div className="f12" style={{ color: 'var(--blueD)' }}>
          <i className="ti ti-player-play" aria-hidden="true"></i> Watch a 2-minute how-to
        </div>
      </div>

      <div className={`card ${complete ? 'accent-teal' : ''} li`} onClick={() => toggleDone('family-name')}
        style={{ cursor: 'pointer' }}>
        <i className={`lead ti ${complete ? 'ti-circle-check ic-teal' : 'ti-circle ic-gray'}`} style={{ fontSize: 24 }} aria-hidden="true"></i>
        <div className="grow">
          <div className="f14 b">I've found a family name</div>
          <div className="f11 hint">Tap to mark this step complete</div>
        </div>
      </div>

      <div className="card tint-blue">
        <div className="f12" style={{ color: 'var(--blueD)' }}>
          <i className="ti ti-bulb" aria-hidden="true"></i> Your ward family history consultant can help with any step.
        </div>
      </div>
    </div>
  )
}
