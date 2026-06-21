import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdateBanner() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div style={{
      position: 'fixed', left: '50%', transform: 'translateX(-50%)',
      bottom: 'calc(64px + env(safe-area-inset-bottom))', width: '92%', maxWidth: 420,
      background: '#1F3864', color: '#fff', borderRadius: 12, padding: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 10, zIndex: 60,
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
    }}>
      <i className="ti ti-sparkles" aria-hidden="true" style={{ fontSize: 20 }}></i>
      <span style={{ flex: 1, fontSize: 13 }}>A new version is available.</span>
      <button onClick={() => updateServiceWorker(true)}
        style={{ background: '#fff', color: '#1F3864', border: 'none', borderRadius: 8,
          padding: '7px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
        Update
      </button>
      <button onClick={() => setNeedRefresh(false)} aria-label="Dismiss"
        style={{ background: 'none', border: 'none', color: '#B5D4F4', cursor: 'pointer', fontSize: 18 }}>
        <i className="ti ti-x" aria-hidden="true"></i>
      </button>
    </div>
  )
}
