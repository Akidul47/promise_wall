import { useState } from 'react'
import { COLORS, MAX_LENGTH, validateNote } from '../lib/notesApi'

export default function PostForm({ onPost }) {
  const [text, setText] = useState('')
  const [type, setType] = useState('promise')
  const [color, setColor] = useState('yellow')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const remaining = MAX_LENGTH - text.length

  async function handleSubmit(e) {
    e.preventDefault()
    const problem = validateNote(text)
    if (problem) {
      setError(problem)
      return
    }
    setSending(true)
    setError('')
    try {
      await onPost({ text, type, color })
      setText('')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <form className={`composer note--${color}`} onSubmit={handleSubmit}>
      <div className="composer__types" role="radiogroup" aria-label="Note type">
        {['promise', 'wish'].map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={type === t}
            className={`chip${type === t ? ' chip--active' : ''}`}
            onClick={() => setType(t)}
          >
            {t === 'promise' ? 'I promise…' : 'I wish…'}
          </button>
        ))}
      </div>

      <label htmlFor="note-text" className="sr-only">
        Your {type}
      </label>
      <textarea
        id="note-text"
        value={text}
        onChange={(e) => {
          setText(e.target.value.slice(0, MAX_LENGTH))
          if (error) setError('')
        }}
        placeholder={type === 'promise' ? 'I promise to…' : 'I wish…'}
        rows={3}
        maxLength={MAX_LENGTH}
      />

      <div className="composer__footer">
        <div className="composer__colors" role="radiogroup" aria-label="Note color">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={color === c}
              aria-label={c}
              className={`swatch swatch--${c}${color === c ? ' swatch--active' : ''}`}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <span className={`composer__count${remaining < 20 ? ' composer__count--low' : ''}`}>{remaining}</span>
        <button type="submit" className="button" disabled={sending || text.trim().length === 0}>
          {sending ? 'Pinning…' : 'Pin it'}
        </button>
      </div>

      {error && (
        <p className="composer__error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
