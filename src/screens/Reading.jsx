import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { bomBooks } from '../data/content'

export default function Reading() {
  const nav = useNavigate()
  const { state, toggleReading } = useStore()
  const done = bomBooks.filter((b) => state.reading[b.id]).length
  const pct = Math.round((done / bomBooks.length) * 100)

  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Book of Mormon reading</h1>
      </div>
      <p className="screen-sub">Reading isn't a race — it's time with the Lord. Mark a book when you finish it.</p>

      <div className="card tint-teal">
        <div className="between f13 b" style={{ color: 'var(--tealD)' }}>
          <span>Your reading</span><span>{done} of {bomBooks.length} books</span>
        </div>
        <div className="bar teal" style={{ margin: '8px 0 0' }}><span style={{ width: `${pct}%` }} /></div>
      </div>

      <div className="card" style={{ padding: '6px 10px' }}>
        <a href="https://www.churchofjesuschrist.org/study/scriptures/bofm?lang=eng" target="_blank" rel="noreferrer"
          className="between li flat" style={{ color: 'var(--blueD)' }}>
          <span className="f13"><i className="ti ti-book-2" aria-hidden="true"></i> Read in Gospel Library</span>
          <i className="ti ti-external-link" aria-hidden="true"></i>
        </a>
        <a href="https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-doctrine-and-covenants-2025?lang=eng" target="_blank" rel="noreferrer"
          className="between li flat" style={{ color: 'var(--blueD)' }}>
          <span className="f13"><i className="ti ti-calendar" aria-hidden="true"></i> Come, Follow Me this week</span>
          <i className="ti ti-external-link" aria-hidden="true"></i>
        </a>
      </div>

      <div className="card">
        {bomBooks.map((b) => (
          <div key={b.id} className="li" onClick={() => toggleReading(b.id)} style={{ padding: '7px 2px' }}>
            <i className={`lead ti ${state.reading[b.id] ? 'ti-circle-check ic-teal' : 'ti-circle ic-gray'}`} aria-hidden="true"></i>
            <span className="grow f13" style={{ color: state.reading[b.id] ? 'var(--t1)' : 'var(--t2)' }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
