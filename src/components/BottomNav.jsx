import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', icon: 'ti-home', label: 'Home', end: true },
  { to: '/path', icon: 'ti-route', label: 'Path' },
  { to: '/lessons', icon: 'ti-book', label: 'Lessons' },
  { to: '/checkin', icon: 'ti-checkbox', label: 'Check-in' },
  { to: '/people', icon: 'ti-users', label: 'People' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {tabs.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.end}
          className={({ isActive }) => (isActive ? 'active' : '')}>
          <i className={`i ti ${t.icon}`} aria-hidden="true"></i>
          {t.label}
        </NavLink>
      ))}
    </nav>
  )
}
