import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'

function Field({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

export default function Settings() {
  const nav = useNavigate()
  const { state, setProfile, restoreIntro, resetProgress } = useStore()
  const p = state.profile

  const onReset = () => {
    if (window.confirm('Reset all progress? This clears lessons, check-ins, readiness, and journal. Your profile is kept. This cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <div>
      <div className="topbar">
        <button className="back" onClick={() => nav(-1)} aria-label="Back"><i className="ti ti-arrow-left"></i></button>
        <h1>Settings</h1>
      </div>

      <div className="card">
        <div className="f12 hint" style={{ marginBottom: 8 }}>Your profile</div>
        <Field label="Name" value={p.name} onChange={(v) => setProfile({ name: v })} placeholder="Your name" />
        <Field label="Ward / branch" value={p.ward} onChange={(v) => setProfile({ ward: v })} placeholder="Ward or branch" />
        <Field label="Date of baptism" type="date" value={p.baptismDate} onChange={(v) => setProfile({ baptismDate: v })} />
        <Field label="Date of confirmation" type="date" value={p.confirmationDate} onChange={(v) => setProfile({ confirmationDate: v })} />
        <Field label="Goal: receive endowment by" type="date" value={p.endowmentGoal} onChange={(v) => setProfile({ endowmentGoal: v })} />
      </div>

      <div className="card">
        <div className="f12 hint" style={{ marginBottom: 8 }}>App</div>
        <button className="btn" style={{ marginBottom: 8 }} onClick={restoreIntro}>
          <i className="ti ti-compass" aria-hidden="true"></i> Show the intro again
        </button>
        <button className="btn" style={{ color: 'var(--coral)' }} onClick={onReset}>
          <i className="ti ti-refresh" aria-hidden="true"></i> Reset all progress
        </button>
      </div>

      <div className="card">
        <div className="f11 hint">
          Your progress is stored privately on this device only. Content is summarized from
          Preach My Gospel and My Covenant Path; not affiliated with or endorsed by the Church.
        </div>
      </div>
    </div>
  )
}
