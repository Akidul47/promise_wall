// Data layer for Promise Wall.
//
// Right now this uses sample data kept in memory, so the frontend works on
// its own. When Supabase is set up, only this file changes: getNotes() and
// addNote() will call Supabase instead. The components don't need to know.

export const MAX_LENGTH = 200

export const COLORS = ['yellow', 'pink', 'blue', 'green']

let notes = [
  { id: 1, type: 'promise', text: 'I promise to call my mother every Sunday, no matter how busy the week gets.', color: 'yellow', createdAt: '2026-10-24T15:10:00Z' },
  { id: 2, type: 'wish', text: 'আমি চাই আমার বাবা-মা একদিন আমার নতুন বাসায় বেড়াতে আসুক।', color: 'pink', createdAt: '2026-10-24T14:02:00Z' },
  { id: 3, type: 'promise', text: 'I promise to stop saying "I will start Monday" and just start today.', color: 'green', createdAt: '2026-10-24T12:45:00Z' },
  { id: 4, type: 'wish', text: 'I wish my little brother gets into the university he has been dreaming about.', color: 'blue', createdAt: '2026-10-23T22:30:00Z' },
  { id: 5, type: 'promise', text: 'আমি প্রতিজ্ঞা করছি, এই বছর অন্তত একটা বই শেষ করবো।', color: 'yellow', createdAt: '2026-10-23T18:05:00Z' },
  { id: 6, type: 'wish', text: 'I wish for one quiet morning with coffee and no notifications.', color: 'green', createdAt: '2026-10-23T09:20:00Z' },
  { id: 7, type: 'promise', text: 'I promise to be kinder to myself when I make mistakes.', color: 'pink', createdAt: '2026-10-22T20:15:00Z' },
  { id: 8, type: 'wish', text: 'I wish to see my grandmother one more time before winter.', color: 'blue', createdAt: '2026-10-22T07:40:00Z' },
]

let nextId = notes.length + 1

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Returns notes newest first.
export async function getNotes() {
  await delay(300)
  return [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// Basic checks before saving. The server will repeat these later,
// since anything in the browser can be bypassed.
export function validateNote(text) {
  const trimmed = text.trim()
  if (trimmed.length < 3) return 'Write a little more.'
  if (trimmed.length > MAX_LENGTH) return `Keep it under ${MAX_LENGTH} characters.`
  if (/(https?:\/\/|www\.)/i.test(trimmed)) return 'Links are not allowed.'
  if (/[\w.+-]+@[\w-]+\.\w+/.test(trimmed)) return 'Please leave out email addresses, so the wall stays anonymous.'
  if (/(\+?\d[\d\s-]{8,}\d)/.test(trimmed)) return 'Please leave out phone numbers, so the wall stays anonymous.'
  return null
}

export async function addNote({ text, type, color }) {
  const error = validateNote(text)
  if (error) throw new Error(error)
  await delay(300)
  const note = {
    id: nextId++,
    type,
    text: text.trim(),
    color,
    createdAt: new Date().toISOString(),
  }
  notes = [note, ...notes]
  return note
}
