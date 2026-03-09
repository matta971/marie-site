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

const EMERALD = '#046D5D'
const EMERALD_DARK = '#035248'
const EMERALD_LIGHT = '#e6f5f2'
const GOLD = '#D4AF37'
const GOLD_DARK = '#B8962E'

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
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ fontFamily: "'Lato', sans-serif", background: 'linear-gradient(135deg, #f0faf8, #ffffff, #fdf8ec)' }}
      >
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" style={{ background: `${EMERALD}15` }} />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl" style={{ background: `${GOLD}20` }} />
        </div>

        <form
          onSubmit={handleLogin}
          className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 w-full max-w-sm"
          style={{ borderColor: `${EMERALD}15`, borderWidth: 1, boxShadow: `0 25px 50px -12px ${EMERALD}10` }}
        >
          <div
            className="w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})`, boxShadow: `0 10px 25px -5px ${EMERALD}40` }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
              <path d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .456.122Z" />
            </svg>
          </div>

          <h1
            className="text-2xl font-semibold text-neutral-900 mb-1 text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
          >
            Espace Admin
          </h1>
          <p className="text-neutral-400 text-sm mb-8 text-center">
            Gestion du contenu du site
          </p>

          {loginError && (
            <div role="alert" className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              {loginError}
            </div>
          )}

          <label htmlFor="admin-password" className="sr-only">Mot de passe</label>
          <div className="mb-5">
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setLoginError('') }}
              placeholder="Mot de passe"
              className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm transition-all"
              style={{ outline: 'none' }}
              onFocus={(e) => {
                e.target.style.borderColor = EMERALD
                e.target.style.boxShadow = `0 0 0 3px ${EMERALD}20`
                e.target.style.background = '#fff'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e5e5'
                e.target.style.boxShadow = 'none'
                e.target.style.background = '#fafafa'
              }}
              autoFocus
              disabled={loginLoading}
            />
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full text-white py-3.5 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})`,
              boxShadow: `0 10px 25px -5px ${EMERALD}30`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${EMERALD_DARK}, ${EMERALD_DARK})` }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})` }}
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
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "'Lato', sans-serif", background: 'linear-gradient(135deg, #f5faf9, #f8f8f6)' }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md px-5 py-3.5 flex items-center justify-between sticky top-0 z-10" style={{ borderBottom: '1px solid #e5e5e540' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})`, boxShadow: `0 4px 12px -2px ${EMERALD}30` }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 text-white">
              <path d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .456.122Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-neutral-900">Assistant Admin</h1>
            <p className="text-xs text-neutral-400">Gestion du contenu Notion</p>
          </div>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Se déconnecter ?')) {
              setAuthenticated(false)
              setPassword('')
              setMessages([])
            }
          }}
          className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer"
        >
          Déconnexion
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5" role="log" aria-live="polite">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} max-w-3xl mx-auto`}
          >
            {/* Avatar assistant */}
            {msg.role === 'assistant' && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3 mt-0.5"
                style={{ background: `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})`, boxShadow: `0 2px 8px -2px ${EMERALD}40` }}
              >
                <span className="text-white text-xs font-bold">M</span>
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'text-white rounded-2xl rounded-br-md whitespace-pre-wrap'
                  : 'bg-white text-neutral-700 rounded-2xl rounded-tl-md shadow-sm'
              }`}
              style={msg.role === 'user'
                ? { background: `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})`, boxShadow: `0 4px 15px -3px ${EMERALD}25` }
                : { border: '1px solid #e5e5e540' }
              }
            >
              {msg.role === 'user' ? msg.content : (
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-3 rounded-xl border border-neutral-200">
                        <table className="w-full text-xs">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="text-neutral-500 font-medium text-[11px] uppercase tracking-wider" style={{ background: EMERALD_LIGHT }}>{children}</thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-3 py-2.5 text-left whitespace-nowrap">{children}</th>
                    ),
                    td: ({ children }) => (
                      <td className="px-3 py-2 border-t border-neutral-100 whitespace-nowrap">{children}</td>
                    ),
                    tr: ({ children }) => (
                      <tr className="transition-colors" style={{ cursor: 'default' }} onMouseEnter={(e) => { e.currentTarget.style.background = EMERALD_LIGHT }} onMouseLeave={(e) => { e.currentTarget.style.background = '' }}>{children}</tr>
                    ),
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="font-semibold text-neutral-900">{children}</strong>,
                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    code: ({ children }) => <code className="px-1.5 py-0.5 rounded-md text-xs font-mono" style={{ background: EMERALD_LIGHT, color: EMERALD }}>{children}</code>,
                  }}
                >
                  {msg.content}
                </Markdown>
              )}
            </div>
            {/* Avatar user */}
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-3 mt-0.5" style={{ background: `${GOLD}20` }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: GOLD_DARK }}>
                  <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                </svg>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start max-w-3xl mx-auto">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3 mt-0.5"
              style={{ background: `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})`, boxShadow: `0 2px 8px -2px ${EMERALD}40` }}
            >
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md px-5 py-4 shadow-sm" style={{ border: '1px solid #e5e5e540' }} role="status" aria-label="Chargement">
              <div className="flex space-x-1.5 motion-reduce:animate-none">
                <div className="w-2 h-2 rounded-full animate-bounce motion-reduce:animate-pulse" style={{ background: EMERALD, animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full animate-bounce motion-reduce:animate-pulse" style={{ background: EMERALD, animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full animate-bounce motion-reduce:animate-pulse" style={{ background: EMERALD, animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-md p-4" style={{ borderTop: '1px solid #e5e5e540' }}>
        <div className="flex items-end gap-3 max-w-3xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écris ton message..."
            rows={1}
            className="flex-1 resize-none px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm transition-all"
            style={{ maxHeight: '120px', outline: 'none' }}
            onFocus={(e) => {
              e.target.style.borderColor = EMERALD
              e.target.style.boxShadow = `0 0 0 3px ${EMERALD}20`
              e.target.style.background = '#fff'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e5e5'
              e.target.style.boxShadow = 'none'
              e.target.style.background = '#fafafa'
            }}
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
            className="text-white p-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})`,
              boxShadow: `0 4px 12px -2px ${EMERALD}30`,
            }}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = `linear-gradient(135deg, ${EMERALD_DARK}, ${EMERALD_DARK})` }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${EMERALD}, ${EMERALD_DARK})` }}
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
