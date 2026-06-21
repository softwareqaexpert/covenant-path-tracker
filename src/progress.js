import { lessons, pathStages } from './data/curriculum'

export function lessonProgress(lesson, isDone) {
  const total = lesson.principles.length
  const done = lesson.principles.filter((p) => isDone(p.id)).length
  return { done, total, pct: Math.round((done / total) * 100), complete: done === total }
}

export function lessonsComplete(isDone) {
  return lessons.filter((l) => lessonProgress(l, isDone).complete).length
}

export function stageStatus(stage, isDone, profile) {
  if (stage.kind === 'profileDate') {
    return profile[stage.dateKey] ? 'done' : 'todo'
  }
  if (stage.kind === 'lessons') {
    const c = lessonsComplete(isDone)
    if (c === lessons.length) return 'done'
    return c > 0 ? 'current' : 'todo'
  }
  return isDone(stage.id) ? 'done' : 'todo'
}

// Overall path progress across all stages (lessons counted by principle).
export function overallProgress(isDone, profile) {
  let total = 0
  let done = 0
  for (const stage of pathStages) {
    if (stage.kind === 'lessons') {
      for (const l of lessons) {
        total += l.principles.length
        done += l.principles.filter((p) => isDone(p.id)).length
      }
    } else if (stage.kind === 'profileDate') {
      total += 1
      if (profile[stage.dateKey]) done += 1
    } else {
      total += 1
      if (isDone(stage.id)) done += 1
    }
  }
  return { done, total, pct: Math.round((done / total) * 100) }
}

export function findCurrentLesson(isDone) {
  return lessons.find((l) => !lessonProgress(l, isDone).complete) || lessons[lessons.length - 1]
}
