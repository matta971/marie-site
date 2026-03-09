import { useState, useRef, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const API_URL = (import.meta.env.PROD || import.meta.env.DEV)
  ? 'https://backend-site-marie-emeraude.matta971.workers.dev/api'
  : 'http://localhost:3001/api'

export default function AdminChat() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (authenticated) {
      inputRef.current?.focus()
    }
  }, [authenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) {
      setLoginError('Veuillez entrer un mot de passe.')
      return
    }
    setLoginError('')
    setLoginLoading(true)
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`,
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Bonjour' }] }),
      })
      if (response.status === 401) {
        setLoginError('Mot de passe incorrect.')
        return
      }
      if (!response.ok) throw new Error(`Erreur ${response.status}`)
      const data = await response.json()
      setAuthenticated(true)
      setMessages([{ role: 'assistant', content: data.reply }])
    } catch {
      setLoginError('Impossible de se connecter. Réessayez.')
    } finally {
      setLoginLoading(false)
    }
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      // Envoyer uniquement le format attendu par Claude API
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (response.status === 401) {
        setAuthenticated(false)
        setPassword('')
        setMessages([])
        setLoginError('Session expirée. Veuillez vous reconnecter.')
        return
      }

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`)
      }

      const data = await response.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Désolé, une erreur est survenue. Réessaie dans un instant.' },
      ])
      console.error('Erreur chat:', error)
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Écran de connexion
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-neutral-800 mb-2 text-center">
            Espace Admin
          </h1>
          <p className="text-neutral-500 text-sm mb-6 text-center">
            Gestion du contenu du site
          </p>
          {loginError && (
            <div role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-4">
              {loginError}
            </div>
          )}
          <label htmlFor="admin-password" className="sr-only">Mot de passe</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setLoginError('') }}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent mb-4"
            autoFocus
            disabled={loginLoading}
          />
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loginLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Connexion...
              </>
            ) : 'Accéder'}
          </button>
        </form>
      </div>
    )
  }

  // Interface chat
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-800">Assistant Admin</h1>
          <p className="text-xs text-neutral-500">Gestion du contenu Notion</p>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Se déconnecter ?')) {
              setAuthenticated(false)
              setPassword('')
              setMessages([])
            }
          }}
          className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          Déconnexion
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} max-w-3xl mx-auto`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-amber-600 text-white rounded-br-md whitespace-pre-wrap'
                  : 'bg-white text-neutral-800 border border-neutral-200 rounded-bl-md shadow-sm'
              }`}
            >
              {msg.role === 'user' ? msg.content : (
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-2 rounded-lg border border-neutral-200">
                        <table className="w-full text-xs">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-neutral-100 text-neutral-600 font-semibold">{children}</thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-3 py-2 text-left whitespace-nowrap">{children}</th>
                    ),
                    td: ({ children }) => (
                      <td className="px-3 py-2 border-t border-neutral-100 whitespace-nowrap">{children}</td>
                    ),
                    tr: ({ children }) => (
                      <tr className="hover:bg-neutral-50">{children}</tr>
                    ),
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                  }}
                >
                  {msg.content}
                </Markdown>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start max-w-3xl mx-auto">
            <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm" role="status" aria-label="Chargement">
              <div className="flex space-x-1.5 motion-reduce:animate-none">
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce motion-reduce:animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce motion-reduce:animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce motion-reduce:animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-neutral-200 bg-white p-4">
        <div className="flex items-end gap-3 max-w-3xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écris ton message..."
            rows={1}
            className="flex-1 resize-none px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            style={{ maxHeight: '120px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = target.scrollHeight + 'px'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Envoyer le message"
            className="bg-amber-600 text-white p-3 rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
