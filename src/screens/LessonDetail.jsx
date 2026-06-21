import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { lessons } from '../data/curriculum'
import { lessonProgress, lessonsComplete } from '../progress'

export default function LessonDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const { isDone, toggleDone, doneDate } = useStore()
  const lesson = lessons.find((l) => l.id === id) || lessons[0]
  const lp = lessonProgress(lesson, isDone)
  const [celebrate, setCelebrate] = useState(false)
  const wasComplete = useRef(lp.complete)

  useEffect(() => {
    if (lp.complete && !wasComplete.current) setCelebrate(true)
    wasComplete.current = lp.complete
  }, [lp.complete])

  const fmt = (iso) => iso ? new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''
  const nextPrincipleId = lesson.principles.find((p) => !isDone(p.id))?.id
  const totalDoneLessons = lessonsComplete(isDone)
  const idx = lessons.findIndex((l) => l.id === lesson.id)
  const nextLesson = lessons[idx + 1]
  let lastGroup = null

  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <div>
          <h1>{lesson.title}</h1>
          <div className="topsub">Lesson {lesson.num} · Preach My Gospel</div>
        </div>
      </div>

      <div className="card" style={{ padding: '10px 14px' }}>
        <div className="f11" style={{ color: 'var(--blueD)' }}>Read together</div>
        <div className="f13">{lesson.scripture}</div>
      </div>

      <div className="between" style={{ margin: '6px 2px' }}>
        <span className="f12 hint">Principles</span>
        <span className="f12 b" style={{ color: 'var(--tealD)' }}>{lp.done} of {lp.total}</span>
      </div>
      <div className="bar teal"><span style={{ width: `${lp.pct}%` }} /></div>

      <div style={{ marginTop: 8 }}>
        {lesson.principles.map((p) => {
          const header = p.group && p.group !== lastGroup ? p.group : null
          lastGroup = p.group || lastGroup
          const done = isDone(p.id)
          const isNext = p.id === nextPrincipleId
          return (
            <div key={p.id}>
              {header && <div className="group-label">{header}</div>}
              <div className={`li ${isNext ? 'active' : ''}`} onClick={() => toggleDone(p.id)}>
                <i className={`lead ti ${done ? 'ti-circle-check ic-teal' : 'ti-circle ic-gray'}`} aria-hidden="true"></i>
                <span className="grow" style={{ color: done ? 'var(--t1)' : isNext ? 'var(--blueDD)' : 'var(--t2)' }}>{p.label}</span>
                {done && <span className="f10 hint">{fmt(doneDate(p.id))}</span>}
                {!done && isNext && <span className="f10" style={{ color: 'var(--blueD)' }}>Next</span>}
              </div>
            </div>
          )
        })}
      </div>

      {celebrate && (
        <div className="modal-overlay" onClick={() => setCelebrate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="celebrate-ring"><i className="ti ti-circle-check ic-teal" style={{ fontSize: 46 }} aria-hidden="true"></i></div>
            <div className="f11 b" style={{ color: 'var(--tealD)', letterSpacing: 1, textTransform: 'uppercase' }}>Lesson complete</div>
            <div className="b" style={{ fontSize: 17, margin: '4px 0' }}>{lesson.title}</div>
            <div className="stars"><i className="ti ti-star"></i><i className="ti ti-star"></i><i className="ti ti-star"></i></div>
            <div className="f12 muted">You've learned {totalDoneLessons} of {lessons.length} lessons. The temple is getting closer.</div>
            {nextLesson && (
              <div className="card" style={{ textAlign: 'left', marginTop: 16 }}>
                <div className="f11 hint">Next up</div>
                <div className="f13 b">{nextLesson.title}</div>
              </div>
            )}
            <button className="btn primary" style={{ marginTop: 8 }}
              onClick={() => { setCelebrate(false); if (nextLesson) nav(`/lessons/${nextLesson.id}`) }}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
