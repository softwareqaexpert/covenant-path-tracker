import { useStore } from '../store.jsx'

function Action({ icon, label, href, enabled }) {
  const cls = 'btn'
  if (!enabled) return <span className={`${cls} disabled`}><i className={`ti ${icon}`} aria-hidden="true"></i> {label}</span>
  return <a className={cls} href={href}><i className={`ti ${icon}`} aria-hidden="true"></i> {label}</a>
}

export default function People() {
  const { state, updateContact } = useStore()
  const contacts = state.contacts
  const minister = contacts.find((c) => c.role.startsWith('Ministering'))
  const noMinister = minister && !minister.name

  return (
    <div>
      <h1 className="screen-title">People</h1>
      <p className="screen-sub">Your ministers, missionaries, and friends.</p>

      {noMinister && (
        <div className="card tint-amber callout">
          <div className="f13 b" style={{ color: 'var(--amberD)' }}>
            <i className="ti ti-alert-triangle" aria-hidden="true"></i> No minister assigned yet
          </div>
          <div className="f12" style={{ color: 'var(--amberD)', marginTop: 4 }}>
            Every member is meant to have ministering brothers or sisters. Ask your elders quorum or
            Relief Society president, or mention it to the bishop, to be assigned one.
          </div>
        </div>
      )}

      {contacts.map((c) => (
        <div key={c.id} className="card">
          <div className="f11 hint">{c.role}</div>
          <div className="field" style={{ marginTop: 6 }}>
            <input placeholder="Name" value={c.name}
              onChange={(e) => updateContact(c.id, { name: e.target.value })} />
          </div>
          <div className="btn-row" style={{ marginBottom: 8 }}>
            <div className="field" style={{ flex: 1, margin: 0 }}>
              <input placeholder="Phone" value={c.phone}
                onChange={(e) => updateContact(c.id, { phone: e.target.value })} />
            </div>
            <div className="field" style={{ flex: 1, margin: 0 }}>
              <input placeholder="Email" value={c.email}
                onChange={(e) => updateContact(c.id, { email: e.target.value })} />
            </div>
          </div>
          <div className="btn-row">
            <Action icon="ti-phone" label="Call" href={`tel:${c.phone}`} enabled={!!c.phone} />
            <Action icon="ti-message" label="Text" href={`sms:${c.phone}`} enabled={!!c.phone} />
            <Action icon="ti-mail" label="Email" href={`mailto:${c.email}`} enabled={!!c.email} />
          </div>
        </div>
      ))}
    </div>
  )
}
