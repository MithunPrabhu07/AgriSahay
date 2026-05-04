import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SpeakButton from '../components/SpeakButton'
import VoiceInputButton from '../components/VoiceInputButton'
import { getBotResponse } from '../services/chatbotService'

function ChatbotPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: t('chatbot.intro')
    }
  ])

  const speechRate = useMemo(() => Number(localStorage.getItem('voiceRate') || 1), [])

  const sendMessage = () => {
    if (!query.trim()) return

    const userMessage = { role: 'user', text: query.trim() }
    const botMessage = { role: 'bot', text: getBotResponse(query) }

    setMessages((prev) => [...prev, userMessage, botMessage])
    setQuery('')
  }

  return (
    <div className="grid gap-4">
      <section className="card p-5">
        <h2 className="font-['Baloo_2'] text-3xl font-bold text-emerald-900">{t('chatbot.title')}</h2>
        <p className="mt-1 text-sm text-emerald-800/80">{t('chatbot.intro')}</p>

        <div className="mt-4 max-h-[380px] space-y-2 overflow-auto rounded-xl bg-emerald-50/60 p-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-xl p-3 text-sm ${
                message.role === 'user' ? 'ml-8 bg-emerald-700 text-white' : 'mr-8 bg-white text-emerald-900'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p>{message.text}</p>
                {message.role === 'bot' && <SpeakButton text={message.text} rate={speechRate} />}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
            className="w-full rounded-xl border border-emerald-900/20 px-4 py-3"
            placeholder={t('chatbot.placeholder')}
          />
          <div className="flex gap-2">
            <VoiceInputButton onVoiceText={setQuery} />
            <button className="btn-primary" type="button" onClick={sendMessage}>
              {t('chatbot.send')}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChatbotPage
