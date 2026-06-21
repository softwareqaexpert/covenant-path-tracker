import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { recommendQuestions } from '../data/curriculum'

export default function RecommendReadiness() {
  const nav = useNavigate()
  const { state, setReadiness, toggleDone, isDone } = useStore()
  const r = state.readiness
  const readyCount = recommendQuestions.filter((q) => r[q.id] === 'ready').length

  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Recommend readiness</h1>
      </div>

      <div style={{ textAlign: 'center', padding: '4px 0 12px' }}>
        <div style={{ fontSize: 30, fontWeight: 600, color: 'var(--tealD)' }}>
          {readyCount}<span className="hint" style={{ fontSize: 16 }}>/{recommendQuestions.length}</span>
        </div>
        <div className="f11 hint">questions you feel ready on</div>
      </div>

      {recommendQuestions.map((q) => {
        const v = r[q.id]
        return (
          <div key={q.id} className="li flat" style={{ alignItems: 'flex-start', padding: '8px 2px' }}>
            <span className="grow f13" style={{ paddingTop: 4 }}>{q.label}</span>
            <span className="seg">
              <button className={v === 'ready' ? 'on-ready' : ''} onClick={() => setReadiness(q.id, 'ready')}>Ready</button>
              <button className={v === 'working' ? 'on-working' : ''} onClick={() => setReadiness(q.id, 'working')}>Working</button>
            </span>
          </div>
        )
      })}

      <button className="btn primary" style={{ marginTop: 14 }} onClick={() => toggleDone('recommend-interview')}>
        <i className="ti ti-calendar-event" aria-hidden="true"></i>
        {isDone('recommend-interview') ? ' Interview requested' : ' Request bishop interview'}
      </button>
      <div className="f11 hint" style={{ textAlign: 'center', marginTop: 6 }}>
        Only the bishop and stake president issue a recommend.
      </div>
    </div>
  )
}
