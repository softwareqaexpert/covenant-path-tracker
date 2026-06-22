import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'

export default function Questions() {
  const nav = useNavigate()
  const { state, addQuestion, toggleQuestionAnswered, deleteQuestion } = useStore()
  const [text, setText] = useState('')

  const save = () => {
    const t = text.trim()
    if (!t) return
    addQuestion(t)
    setText('')
  }

  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Questions for my leaders</h1>
      </div>
      <p className="screen-sub">Jot down a question now, bring it to your bishop or ministers later.</p>

      <div className="card">
        <input value={text} onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to ask?"
          onKeyDown={(e) => { if (e.key === 'Enter') save() }} />
        <button className="btn primary" style={{ marginTop: 8 }} onClick={save}>
          <i className="ti ti-plus" aria-hidden="true"></i> Add question
        </button>
      </div>

      {state.questions.length === 0 && (
        <div className="f12 hint" style={{ textAlign: 'center', padding: '20px 0' }}>No questions yet.</div>
      )}

      {state.questions.map((q) => (
        <div key={q.id} className="card li" style={{ alignItems: 'flex-start' }}>
          <i className={`lead ti ${q.answered ? 'ti-circle-check ic-teal' : 'ti-circle ic-gray'}`}
            onClick={() => toggleQuestionAnswered(q.id)} style={{ cursor: 'pointer' }} aria-hidden="true"></i>
          <span className="grow f13" style={{ textDecoration: q.answered ? 'line-through' : 'none', color: q.answered ? 'var(--t3)' : 'var(--t1)' }}>{q.text}</span>
          <button onClick={() => deleteQuestion(q.id)} aria-label="Delete"
            style={{ background: 'none', border: 'none', color: 'var(--t3)', cursor: 'pointer' }}>
            <i className="ti ti-trash" aria-hidden="true"></i>
          </button>
        </div>
      ))}
    </div>
  )
}
