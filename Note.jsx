function timeAgo(iso) {
  const seconds = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

// A small, stable tilt per note so the wall feels hand-placed.
function tiltFor(id) {
  const tilts = [-2.2, 1.4, -0.8, 2, -1.6, 0.9]
  return tilts[id % tilts.length]
}

// Bengali text reads better upright in a regular font than in the handwriting font.
const hasBengali = (text) => /[ঀ-৿]/.test(text)

export default function Note({ note, isNew }) {
  return (
    <article
      className={`note note--${note.color}${isNew ? ' note--new' : ''}`}
      style={{ '--tilt': `${tiltFor(note.id)}deg` }}
    >
      <span className="note__tag">{note.type === 'promise' ? 'Promise' : 'Wish'}</span>
      <p className={`note__text${hasBengali(note.text) ? ' note__text--bn' : ''}`} lang={hasBengali(note.text) ? 'bn' : undefined}>
        {note.text}
      </p>
      <time className="note__time" dateTime={note.createdAt}>
        {timeAgo(note.createdAt)}
      </time>
    </article>
  )
}
