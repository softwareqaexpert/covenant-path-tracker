import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { templePrep } from '../data/curriculum'

function Section({ data, pill, milestoneId, milestoneLabel }) {
  const { isDone, toggleDone } = useStore()
  return (
    <div className="card">
      <div className="between" style={{ marginBottom: 6 }}>
        <span className="f14 b">{data.title}</span>
        <span className={`pill ${pill}`}>{data.when}</span>
      </div>
      <div className="f11 hint" style={{ marginBottom: 4 }}>{data.need}</div>
      {data.steps.map((s) => (
        <div key={s.id} className="li" onClick={() => toggleDone(s.id)} style={{ padding: '6px 2px' }}>
          <i className={`lead ti ${isDone(s.id) ? 'ti-circle-check ic-teal' : 'ti-circle ic-gray'}`} aria-hidden="true"></i>
          <span className="grow f13">{s.label}</span>
        </div>
      ))}
      <div className="f12 muted" style={{ marginTop: 4 }}>{data.note}</div>
      <div className={`li ${isDone(milestoneId) ? '' : ''}`} onClick={() => toggleDone(milestoneId)}
        style={{ marginTop: 8, cursor: 'pointer' }}>
        <i className={`lead ti ${isDone(milestoneId) ? 'ti-circle-check ic-teal' : 'ti-circle ic-gray'}`} aria-hidden="true"></i>
        <span className="grow f13 b">{milestoneLabel}</span>
      </div>
    </div>
  )
}

export default function TemplePrep() {
  const nav = useNavigate()
  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Prepare for the temple</h1>
      </div>

      <Section data={templePrep.baptisms} pill="teal"
        milestoneId="baptisms-dead" milestoneLabel="I have done baptisms for the dead" />
      <Section data={templePrep.endowment} pill="blue"
        milestoneId="endowment" milestoneLabel="I have received my endowment" />

      <div className="card">
        <div className="row">
          <i className="ti ti-map-pin ic-coral" style={{ fontSize: 20 }} aria-hidden="true"></i>
          <div className="grow">
            <div className="f14 b">Nearest temple</div>
            <div className="f11 hint">Find hours and directions</div>
          </div>
        </div>
        <div className="btn-row" style={{ marginTop: 8 }}>
          <a className="btn" href="https://www.churchofjesuschrist.org/temples/list" target="_blank" rel="noreferrer">
            <i className="ti ti-calendar-plus" aria-hidden="true"></i> Schedule
          </a>
          <a className="btn" href="https://www.churchofjesuschrist.org/temples/list" target="_blank" rel="noreferrer">
            <i className="ti ti-navigation" aria-hidden="true"></i> Directions
          </a>
        </div>
      </div>
    </div>
  )
}
