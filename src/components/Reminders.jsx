import { useEffect } from 'react'
import { useStore } from '../store.jsx'
import { checkinItems } from '../data/curriculum'

// Lightweight daily reminder: schedules a notification while the app is open,
// and nudges on reopen if the reminder time has passed and check-ins aren't done.
// (Reliable background delivery needs native/web-push infrastructure.)
export default function Reminders() {
  const { state } = useStore()
  const { remindersEnabled, reminderTime } = state.prefs

  useEffect(() => {
    if (!remindersEnabled) return
    if (!('Notification' in window) || Notification.permission !== 'granted') return

    let timer
    const today = new Date().toISOString().slice(0, 10)

    const fire = () => {
      if (localStorage.getItem('cpt-last-reminder') === today) return
      const allDone = checkinItems.every((it) => state.checkins[today]?.[it.id])
      if (allDone) return
      localStorage.setItem('cpt-last-reminder', today)
      try {
        new Notification('My Covenant Path', {
          body: 'Time for your daily check-in.',
          icon: import.meta.env.BASE_URL + 'icon.svg',
        })
      } catch { /* ignore */ }
    }

    const [h, m] = (reminderTime || '08:00').split(':').map(Number)
    const target = new Date()
    target.setHours(h, m, 0, 0)
    const now = new Date()
    if (now >= target) fire()
    else timer = setTimeout(fire, target - now)

    return () => clearTimeout(timer)
  }, [remindersEnabled, reminderTime, state.checkins])

  return null
}
