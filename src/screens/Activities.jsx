import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { actions, learnAbout } from '../data/curriculum'

function ChecklistCard({ title, subtitle, items, isDone, toggleDone }) {
  const done = items.filter((i) => isDone(i.id)).length
  return (
    <div className="card">
      <div className="between" style={{ marginBottom: 6 }}>
        <span className="f14 b">{title}</span>
        <span className="f11 hint">{done} of {items.length}</span>
      </div>
      {subtitle && <div className="f11 hint" style={{ marginBottom: 6 }}>{subtitle}</div>}
      {items.map((it) => (
        <div key={it.id} className="li" onClick={() => toggleDone(it.id)} style={{ padding: '7px 2px' }}>
          <i className={`lead ti ${isDone(it.id) ? 'ti-circle-check ic-teal' : 'ti-circle ic-gray'}`} aria-hidden="true"></i>
          <span className="grow f13" style={{ color: isDone(it.id) ? 'var(--t1)' : 'var(--t2)' }}>{it.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Activities() {
  const nav = useNavigate()
  const { isDone, toggleDone } = useStore()

  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Activities & growth</h1>
      </div>
      <p className="screen-sub">Experiences to have during your first year. Check each one off as you go.</p>

      <ChecklistCard title="Growing in the gospel" items={actions} isDone={isDone} toggleDone={toggleDone} />
      <ChecklistCard title="Learn about the Church"
        subtitle="Get to know the organizations you belong to."
        items={learnAbout} isDone={isDone} toggleDone={toggleDone} />
    </div>
  )
}
