import { useState } from 'react'
import { useStore } from '../store.jsx'

export default function Onboarding() {
  const { state, setProfile, setOnboarded } = useStore()
  const [name, setName] = useState(state.profile.name)
  const [goal, setGoal] = useState(state.profile.endowmentGoal)

  if (state.prefs.onboarded) return null

  const finish = () => {
    setProfile({ name: name.trim(), endowmentGoal: goal })
    setOnboarded()
  }

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ textAlign: 'left' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="celebrate-ring" style={{ background: 'var(--blue50)' }}>
            <i className="ti ti-compass ic-blue" style={{ fontSize: 40 }} aria-hidden="true"></i>
          </div>
          <div className="b" style={{ fontSize: 18 }}>Welcome to your covenant path</div>
          <div className="f12 muted" style={{ margin: '4px 0 10px' }}>
            A couple of quick things to personalize your journey. You can change these later in Settings.
          </div>
          <div className="f12" style={{ color: 'var(--blueD)', fontStyle: 'italic', margin: '0 0 14px' }}>
            This is a road of discipleship, not a checklist for earning heaven — just steps to come closer to Christ.
          </div>
        </div>
        <div className="field">
          <label>Your name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div className="field">
          <label>Goal: receive your endowment by</label>
          <input type="date" value={goal} onChange={(e) => setGoal(e.target.value)} />
        </div>
        <button className="btn primary" onClick={finish}>Start</button>
        <button className="btn" style={{ marginTop: 8 }} onClick={setOnboarded}>Skip for now</button>
      </div>
    </div>
  )
}
