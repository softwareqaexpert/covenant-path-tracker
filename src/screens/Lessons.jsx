import { Link } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { lessons } from '../data/curriculum'
import { lessonProgress, findCurrentLesson } from '../progress'

export default function Lessons() {
  const { isDone } = useStore()
  const current = findCurrentLesson(isDone)

  return (
    <div>
      <h1 className="screen-title">Lessons</h1>
      <p className="screen-sub">Check off each principle as it is taught by your ministers or the missionaries.</p>
      {lessons.map((l) => {
        const lp = lessonProgress(l, isDone)
        const isCurrent = l.id === current.id && !lp.complete
        return (
          <Link key={l.id} to={`/lessons/${l.id}`}
            className={`card ${isCurrent ? 'accent' : ''}`} style={{ display: 'block' }}>
            <div className="f14 b" style={{ color: isCurrent ? 'var(--blueD)' : 'var(--t1)' }}>
              {l.num} · {l.title}
            </div>
            {lp.complete
              ? <div className="f11 ic-teal" style={{ marginTop: 4 }}><i className="ti ti-circle-check" aria-hidden="true"></i> Complete</div>
              : <div className="f11 hint" style={{ marginTop: 4 }}>{lp.done} of {lp.total} principles</div>}
            <div className="dots">
              {l.principles.map((p) => (
                <span key={p.id} className={`dot ${isDone(p.id) ? 'done' : 'todo'}`} />
              ))}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
