import { useEffect, useState } from 'react'
import PostForm from './components/PostForm'
import Note from './components/Note'
import { addNote, getNotes } from './lib/notesApi'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'promise', label: 'Promises' },
  { id: 'wish', label: 'Wishes' },
]

export default function App() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [newId, setNewId] = useState(null)

  useEffect(() => {
    getNotes()
      .then(setNotes)
      .finally(() => setLoading(false))
  }, [])

  async function handlePost(draft) {
    const note = await addNote(draft)
    setNotes((prev) => [note, ...prev])
    setNewId(note.id)
    setFilter('all')
  }

  const visible = filter === 'all' ? notes : notes.filter((n) => n.type === filter)

  return (
    <div className="page">
      <header className="header">
        <h1 className="header__title">Promise Wall</h1>
        <p className="header__subtitle">Pin a promise or a wish. No names, no accounts.</p>
      </header>

      <PostForm onPost={handlePost} />

      <nav className="filters" aria-label="Filter notes">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`filter${filter === f.id ? ' filter--active' : ''}`}
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
          >
            {f.label}
          </button>
        ))}
        <span className="filters__count">{notes.length} notes on the wall</span>
      </nav>

      <main>
        {loading ? (
          <p className="empty">Loading the wall…</p>
        ) : visible.length === 0 ? (
          <p className="empty">Nothing here yet. Be the first to pin one.</p>
        ) : (
          <section className="wall">
            {visible.map((note) => (
              <Note key={note.id} note={note} isNew={note.id === newId} />
            ))}
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Notes are anonymous. Please don't include names, phone numbers, or anything that identifies someone.</p>
      </footer>
    </div>
  )
}
