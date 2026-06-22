import { useNavigate } from 'react-router-dom'
import { ordinanceInfo } from '../data/content'

export default function Learn() {
  const nav = useNavigate()
  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Ordinances & blessings</h1>
      </div>
      <p className="screen-sub">What each step means and how to prepare.</p>

      {ordinanceInfo.map((o) => (
        <div key={o.id} className="card">
          <div className="between" style={{ marginBottom: 4 }}>
            <span className="f14 b">{o.title}</span>
            <span className="pill blue f11">{o.when}</span>
          </div>
          <div className="f13 muted">{o.body}</div>
          <a href={o.url} target="_blank" rel="noreferrer" className="f12"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--blueD)', marginTop: 8 }}>
            <i className="ti ti-book-2" aria-hidden="true"></i> Read in Gospel Library
            <i className="ti ti-external-link" aria-hidden="true"></i>
          </a>
        </div>
      ))}
    </div>
  )
}
