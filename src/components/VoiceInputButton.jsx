import { Mic } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getSpeechLocale, startSpeechRecognition } from '../utils/speech'

function VoiceInputButton({ onVoiceText }) {
  const { i18n } = useTranslation()

  const listen = () => {
    startSpeechRecognition({
      language: getSpeechLocale(i18n.language),
      onResult: (text) => onVoiceText(text),
      onError: (message) => alert(message)
    })
  }

  return (
    <button className="btn-muted flex items-center gap-2" onClick={listen} type="button">
      <Mic size={18} />
      Voice
    </button>
  )
}

export default VoiceInputButton
