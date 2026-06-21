import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'

export default function Journal() {
  const nav = useNavigate()
  const { state, addJournal, deleteJournal } = useStore()
  const [text, setText] = useState('')

  const save = () => {
    const t = text.trim()
    if (!t) return
    addJournal(t)
    setText('')
  }

  const fmt = (iso) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Journal</h1>
      </div>
      <p className="screen-sub">Record spiritual impressions and your growing testimony. Saved privately on this device.</p>

      <div className="card">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4}
          placeholder="What did you feel or learn today?"
          style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
            padding: 10, fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }} />
        <button className="btn primary" style={{ marginTop: 8 }} onClick={save}>
          <i className="ti ti-plus" aria-hidden="true"></i> Add entry
        </button>
      </div>

      {state.journal.length === 0 && (
        <div className="f12 hint" style={{ textAlign: 'center', padding: '20px 0' }}>No entries yet.</div>
      )}

      {state.journal.map((e) => (
        <div key={e.id} className="card">
          <div className="between" style={{ marginBottom: 4 }}>
            <span className="f11 hint">{fmt(e.date)}</span>
            <button onClick={() => deleteJournal(e.id)} aria-label="Delete"
              style={{ background: 'none', border: 'none', color: 'var(--t3)', cursor: 'pointer' }}>
              <i className="ti ti-trash" aria-hidden="true"></i>
            </button>
          </div>
          <div className="f13" style={{ whiteSpace: 'pre-wrap' }}>{e.text}</div>
        </div>
      ))}
    </div>
  )
}
