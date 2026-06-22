import { createContext, useContext, useEffect, useState } from 'react'
import { defaultContacts } from './data/curriculum'

const KEY = 'covenant-path-v1'

const initialState = {
  profile: { name: '', ward: '', baptismDate: '', confirmationDate: '', endowmentGoal: '', recommendExpires: '' },
  done: {},          // id -> ISO date string
  checkins: {},      // 'YYYY-MM-DD' -> { itemId: true }
  readiness: {},     // questionId -> 'ready' | 'working'
  contacts: defaultContacts,
  journal: [],       // { id, date, text }
  schedules: {},     // lessonId -> { date, teacher }
  questions: [],     // { id, date, text, answered }
  reading: {},       // bookId -> true
  prefs: { introDismissed: false, onboarded: false, remindersEnabled: false, reminderTime: '08:00' },
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return initialState
    const saved = JSON.parse(raw)
    return {
      ...initialState,
      ...saved,
      profile: { ...initialState.profile, ...(saved.profile || {}) },
      prefs: { ...initialState.prefs, ...(saved.prefs || {}) },
      schedules: { ...(saved.schedules || {}) },
      questions: saved.questions || [],
      reading: { ...(saved.reading || {}) },
    }
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

  const dismissIntro = () => setState((s) => ({ ...s, prefs: { ...s.prefs, introDismissed: true } }))
  const restoreIntro = () => setState((s) => ({ ...s, prefs: { ...s.prefs, introDismissed: false } }))
  const setOnboarded = () => setState((s) => ({ ...s, prefs: { ...s.prefs, onboarded: true } }))
  const setPref = (patch) => setState((s) => ({ ...s, prefs: { ...s.prefs, ...patch } }))

  const setSchedule = (lessonId, patch) => setState((s) => ({
    ...s,
    schedules: { ...s.schedules, [lessonId]: { ...(s.schedules[lessonId] || {}), ...patch } },
  }))

  const addJournal = (text) => setState((s) => ({
    ...s,
    journal: [{ id: Date.now().toString(), date: new Date().toISOString(), text }, ...s.journal],
  }))
  const deleteJournal = (id) => setState((s) => ({ ...s, journal: s.journal.filter((e) => e.id !== id) }))

  const addQuestion = (text) => setState((s) => ({
    ...s,
    questions: [{ id: Date.now().toString(), date: new Date().toISOString(), text, answered: false }, ...s.questions],
  }))
  const toggleQuestionAnswered = (id) => setState((s) => ({
    ...s,
    questions: s.questions.map((q) => (q.id === id ? { ...q, answered: !q.answered } : q)),
  }))
  const deleteQuestion = (id) => setState((s) => ({ ...s, questions: s.questions.filter((q) => q.id !== id) }))

  const toggleReading = (bookId) => setState((s) => {
    const reading = { ...s.reading }
    if (reading[bookId]) delete reading[bookId]
    else reading[bookId] = true
    return { ...s, reading }
  })

  const resetProgress = () => setState((s) => ({
    ...s, done: {}, checkins: {}, readiness: {}, journal: [], schedules: {}, questions: [], reading: {},
  }))

  const replaceState = (next) => setState(() => ({
    ...initialState, ...next,
    profile: { ...initialState.profile, ...(next.profile || {}) },
    prefs: { ...initialState.prefs, ...(next.prefs || {}) },
  }))

  const value = {
    state, isDone, toggleDone, doneDate, setProfile, updateContact,
    toggleCheckin, isChecked, today, setReadiness,
    dismissIntro, restoreIntro, setOnboarded, setPref, setSchedule,
    addJournal, deleteJournal, addQuestion, toggleQuestionAnswered, deleteQuestion,
    toggleReading, resetProgress, replaceState,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
