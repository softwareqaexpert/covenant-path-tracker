import { useStore } from '../store.jsx'
import { covenantPathIntro, introLinks } from '../data/curriculum'

export default function IntroBox() {
  const { state, dismissIntro } = useStore()
  if (state.prefs.introDismissed) return null

  return (
    <div className="card tint-blue" style={{ position: 'relative' }}>
      <button onClick={dismissIntro} aria-label="Dismiss"
        style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none',
          color: 'var(--blueD)', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>
        <i className="ti ti-x" aria-hidden="true"></i>
      </button>
      <div className="f13 b" style={{ color: 'var(--blueDD)', marginBottom: 4 }}>
        <i className="ti ti-compass" aria-hidden="true"></i> Start here
      </div>
      <div className="f13" style={{ color: 'var(--blueDD)', marginBottom: 10 }}>{covenantPathIntro}</div>
      <div className="f11 b" style={{ color: 'var(--blueD)', marginBottom: 6 }}>Learn more</div>
      {introLinks.map((l) => (
        <a key={l.id} href={l.url} target="_blank" rel="noreferrer"
          className="f12" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--blueD)', padding: '4px 0' }}>
          <i className="ti ti-book-2" aria-hidden="true"></i>
          <span style={{ flex: 1 }}>{l.label}</span>
          <i className="ti ti-external-link" aria-hidden="true"></i>
        </a>
      ))}
      <div className="f10 hint" style={{ marginTop: 8 }}>Opens in the Gospel Library app if installed.</div>
    </div>
  )
}
