import { useNavigate } from 'react-router-dom'
import { churchSections } from '../data/content'

export default function Church() {
  const nav = useNavigate()
  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Your first Sundays</h1>
      </div>
      <p className="screen-sub">What to expect when you come to church.</p>

      {churchSections.map((s) => (
        <div key={s.title} className="card">
          <div className="row" style={{ marginBottom: 6 }}>
            <i className={`ti ${s.icon} ic-blue`} style={{ fontSize: 20 }} aria-hidden="true"></i>
            <span className="f14 b">{s.title}</span>
          </div>
          <div className="f13 muted">{s.body}</div>
        </div>
      ))}
    </div>
  )
}
