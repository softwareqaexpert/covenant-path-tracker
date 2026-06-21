import { createContext, useContext, useEffect, useState } from 'react'
import { defaultContacts } from './data/curriculum'

const KEY = 'covenant-path-v1'

const initialState = {
  profile: { name: '', ward: '', baptismDate: '', confirmationDate: '', endowmentGoal: '' },
  done: {},          // id -> ISO date string
  checkins: {},      // 'YYYY-MM-DD' -> { itemId: true }
  readiness: {},     // questionId -> 'ready' | 'working'
  contacts: defaultContacts,
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return initialState
    return { ...initialState, ...JSON.parse(raw) }
  } catch {
    return initialState
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const isDone = (id) => Boolean(state.done[id])

  const toggleDone = (id) => setState((s) => {
    const done = { ...s.done }
    if (done[id]) delete done[id]
    else done[id] = new Date().toISOString()
    return { ...s, done }
  })

  const doneDate = (id) => state.done[id] || null

  const setProfile = (patch) => setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }))

  const updateContact = (id, patch) => setState((s) => ({
    ...s,
    contacts: s.contacts.map((c) => (c.id === id ? { ...c, ...patch } : c)),
  }))

  const today = () => new Date().toISOString().slice(0, 10)

  const toggleCheckin = (itemId, day = today()) => setState((s) => {
    const dayMap = { ...(s.checkins[day] || {}) }
    if (dayMap[itemId]) delete dayMap[itemId]
    else dayMap[itemId] = true
    return { ...s, checkins: { ...s.checkins, [day]: dayMap } }
  })

  const isChecked = (itemId, day = today()) => Boolean(state.checkins[day]?.[itemId])

  const setReadiness = (qId, value) => setState((s) => ({
    ...s,
    readiness: { ...s.readiness, [qId]: s.readiness[qId] === value ? undefined : value },
  }))

  const value = {
    state, isDone, toggleDone, doneDate, setProfile,
    updateContact, toggleCheckin, isChecked, today, setReadiness,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
