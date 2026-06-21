import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { pathStages } from '../data/curriculum'
import { stageStatus, lessonsComplete } from '../progress'
import { lessons } from '../data/curriculum'

export default function Path() {
  const { isDone, state } = useStore()
  const nav = useNavigate()
  const prof = state.profile

  const rows = pathStages.map((s) => ({ stage: s, status: stageStatus(s, isDone, prof) }))
  const firstTodo = rows.findIndex((r) => r.status !== 'done')
  if (firstTodo >= 0 && rows[firstTodo].status === 'todo') rows[firstTodo].status = 'current'

  const sub = (s, status) => {
    if (s.kind === 'profileDate') return prof[s.dateKey] || (status === 'current' ? 'Up next' : 'Not yet')
    if (s.kind === 'lessons') {
      const c = lessonsComplete(isDone)
      return c === lessons.length ? 'Complete' : `${c} of ${lessons.length} lessons`
    }
    if (status === 'done') return 'Complete'
    if (status === 'current') return 'Up next'
    return 'Locked'
  }

  const icon = (status) => status === 'done' ? 'ti-check' : status === 'current' ? 'ti-player-play' : 'ti-lock'

  return (
    <div>
      <h1 className="screen-title">My covenant path</h1>
      {rows.map(({ stage, status }, i) => (
        <div key={stage.id} className="timeline-row"
          onClick={() => stage.link && nav(stage.link)}
          style={{ cursor: stage.link ? 'pointer' : 'default' }}>
          <div className="timeline-rail">
            <span className={`node ${status}`}><i className={`ti ${icon(status)}`} aria-hidden="true"></i></span>
            {i < rows.length - 1 && <span className={`connector ${status === 'done' ? 'done' : ''}`} />}
          </div>
          <div className="timeline-body">
            <div className="f14 b" style={{ color: status === 'todo' ? 'var(--t2)' : status === 'current' ? 'var(--blueD)' : 'var(--t1)' }}>
              {stage.label}
            </div>
            <div className="f12 hint" style={{ color: status === 'current' ? 'var(--blueD)' : 'var(--t3)' }}>
              {sub(stage, status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
