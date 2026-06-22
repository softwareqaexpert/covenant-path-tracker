import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { overallProgress, lessonsComplete } from '../progress'
import { recommendQuestions } from '../data/curriculum'

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
  const { state, setProfile, restoreIntro, resetProgress, replaceState, setPref } = useStore()
  const p = state.profile
  const fileRef = useRef(null)

  const onToggleReminders = async () => {
    if (!state.prefs.remindersEnabled) {
      if ('Notification' in window && Notification.permission !== 'granted') {
        const perm = await Notification.requestPermission()
        if (perm !== 'granted') {
          window.alert('Notifications are blocked. Enable them in your browser settings to get reminders.')
          return
        }
      }
      setPref({ remindersEnabled: true })
    } else {
      setPref({ remindersEnabled: false })
    }
  }

  const onExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'covenant-path-backup.json'
    a.click()
    URL.revokeObjectURL(url)
  }
  const onImportFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const data = JSON.parse(await file.text())
      if (window.confirm('Restore from this backup? It will replace your current data.')) {
        replaceState(data)
        window.alert('Backup restored.')
      }
    } catch {
      window.alert('That file could not be read as a backup.')
    }
    e.target.value = ''
  }

  const onReset = () => {
    if (window.confirm('Reset all progress? This clears lessons, check-ins, readiness, and journal. Your profile is kept. This cannot be undone.')) {
      resetProgress()
    }
  }

  const isDone = (id) => Boolean(state.done[id])
  const onShare = async () => {
    const ov = overallProgress(isDone, p)
    const lc = lessonsComplete(isDone)
    const rr = recommendQuestions.filter((q) => state.readiness[q.id] === 'ready').length
    const text = [
      `My Covenant Path progress${p.name ? ' — ' + p.name : ''}`,
      `Overall: ${ov.pct}% complete`,
      `Lessons: ${lc} of 4 complete`,
      `Recommend readiness: ${rr} of ${recommendQuestions.length}`,
      p.endowmentGoal ? `Endowment goal: ${p.endowmentGoal}` : null,
    ].filter(Boolean).join('\n')
    try {
      if (navigator.share) await navigator.share({ title: 'My Covenant Path', text })
      else { await navigator.clipboard.writeText(text); window.alert('Progress copied to clipboard.') }
    } catch { /* user cancelled */ }
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
        <Field label="Temple recommend expires" type="date" value={p.recommendExpires} onChange={(v) => setProfile({ recommendExpires: v })} />
      </div>

      <div className="card">
        <div className="f12 hint" style={{ marginBottom: 8 }}>App</div>
        <button className="btn" style={{ marginBottom: 8 }} onClick={onShare}>
          <i className="ti ti-share" aria-hidden="true"></i> Share my progress
        </button>
        <button className="btn" style={{ marginBottom: 8 }} onClick={restoreIntro}>
          <i className="ti ti-compass" aria-hidden="true"></i> Show the intro again
        </button>
        <button className="btn" style={{ color: 'var(--coral)' }} onClick={onReset}>
          <i className="ti ti-refresh" aria-hidden="true"></i> Reset all progress
        </button>
      </div>

      <div className="card">
        <div className="between">
          <span className="f14 b">Daily reminder</span>
          <button className="btn" style={{ width: 'auto', padding: '6px 14px' }} onClick={onToggleReminders}>
            {state.prefs.remindersEnabled ? 'On' : 'Off'}
          </button>
        </div>
        {state.prefs.remindersEnabled && (
          <div className="field" style={{ marginTop: 10 }}>
            <label>Remind me at</label>
            <input type="time" value={state.prefs.reminderTime} onChange={(e) => setPref({ reminderTime: e.target.value })} />
          </div>
        )}
        <div className="f11 hint" style={{ marginTop: 6 }}>
          Works best with the app added to your home screen. Reminders may appear only while the app is open or when you reopen it.
        </div>
      </div>

      <div className="card">
        <div className="f12 hint" style={{ marginBottom: 8 }}>Backup</div>
        <button className="btn" style={{ marginBottom: 8 }} onClick={onExport}>
          <i className="ti ti-download" aria-hidden="true"></i> Export my data
        </button>
        <button className="btn" onClick={() => fileRef.current?.click()}>
          <i className="ti ti-upload" aria-hidden="true"></i> Restore from backup
        </button>
        <input ref={fileRef} type="file" accept="application/json" style={{ display: 'none' }} onChange={onImportFile} />
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
