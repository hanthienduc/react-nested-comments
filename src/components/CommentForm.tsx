import { SetStateAction, SyntheticEvent, useState } from "react"

interface CommentFormProps {
  loading: boolean,
  error: string,
  onSubmit: (message: string) => Promise<any>
  autoFocus: boolean
  initialValue: ''
}

export function CommentForm({ loading, error, onSubmit, autoFocus, initialValue = '' }: CommentFormProps) {

  const [message, setMessage] = useState<string>(initialValue)

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea className='message-input' value={message} autoFocus={autoFocus}
        onChange={(e) => setMessage(e.target.value as SetStateAction<string>)
        }
      />
      <button disabled={loading} className="btn">{loading ? 'Loading...' : 'Post'}</button>
      <div className="error-msg">
        {error}
      </div>
    </form>
  )
}