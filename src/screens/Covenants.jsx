import { useNavigate } from 'react-router-dom'
import { framingLong, baptismalPromises, godPromises, templeCovenantsAhead } from '../data/content'

function List({ items, color }) {
  return items.map((t) => (
    <div key={t} className="li flat" style={{ padding: '6px 2px', alignItems: 'flex-start' }}>
      <i className="lead ti ti-point-filled" style={{ color, fontSize: 16, marginTop: 3 }} aria-hidden="true"></i>
      <span className="grow f13">{t}</span>
    </div>
  ))
}

export default function Covenants() {
  const nav = useNavigate()
  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>My covenants</h1>
      </div>

      <div className="card tint-blue">
        <div className="f13" style={{ color: 'var(--blueDD)' }}>{framingLong}</div>
      </div>

      <div className="card">
        <div className="f14 b" style={{ marginBottom: 4 }}>At baptism, you covenanted to…</div>
        <List items={baptismalPromises} color="var(--teal)" />
        <div className="f10 hint" style={{ marginTop: 6 }}>Mosiah 18:8–10; Doctrine and Covenants 20:37</div>
      </div>

      <div className="card">
        <div className="f14 b" style={{ marginBottom: 4 }}>And God promised…</div>
        <List items={godPromises} color="var(--blue)" />
      </div>

      <div className="card tint-teal">
        <div className="f13 b" style={{ color: 'var(--tealD)' }}>
          <i className="ti ti-refresh" aria-hidden="true"></i> Renewed every week
        </div>
        <div className="f13" style={{ color: 'var(--tealD)', marginTop: 4 }}>
          Each Sunday, as you partake of the sacrament, you renew these covenants — and the promise
          that His Spirit will be with you. You don’t have to be perfect; you just keep coming back to Him.
        </div>
      </div>

      <div className="card">
        <div className="f14 b" style={{ marginBottom: 4 }}>Later, in the temple…</div>
        <div className="f12 hint" style={{ marginBottom: 4 }}>You will make additional covenants:</div>
        <List items={templeCovenantsAhead} color="var(--amber)" />
      </div>
    </div>
  )
}
