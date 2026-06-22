import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { glossary } from '../data/content'

export default function Glossary() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const items = term
    ? glossary.filter((g) => g.term.toLowerCase().includes(term) || g.def.toLowerCase().includes(term))
    : glossary

  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Glossary</h1>
      </div>
      <p className="screen-sub">Unfamiliar word? Look it up here.</p>

      <div className="field">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search terms" />
      </div>

      {items.map((g) => (
        <div key={g.term} className="card" style={{ padding: '12px 14px' }}>
          <div className="f14 b">{g.term}</div>
          <div className="f13 muted" style={{ marginTop: 2 }}>{g.def}</div>
        </div>
      ))}
      {items.length === 0 && <div className="f12 hint" style={{ textAlign: 'center', padding: 20 }}>No matches.</div>}
    </div>
  )
}
