import { Volume2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getSpeechLocale, speakText } from '../utils/speech'

function SpeakButton({ text, rate = 1 }) {
  const { i18n } = useTranslation()

  return (
    <button
      type="button"
      onClick={() => speakText({ text, language: getSpeechLocale(i18n.language), rate })}
      className="btn-muted flex items-center gap-2"
    >
      <Volume2 size={18} />
      Speak
    </button>
  )
}

export default SpeakButton
