const LANGUAGE_MAP = {
  en: 'en-US',
  ta: 'ta-IN',
  hi: 'hi-IN'
}

export function getSpeechLocale(appLang) {
  return LANGUAGE_MAP[appLang] || 'en-US'
}

export function startSpeechRecognition({ language, onResult, onError }) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!Recognition) {
    onError?.('Speech recognition is not supported in this browser.')
    return null
  }

  const recognition = new Recognition()
  recognition.lang = language
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript || ''
    onResult?.(transcript)
  }

  recognition.onerror = () => {
    onError?.('Unable to capture voice input. Please try again.')
  }

  recognition.start()
  return recognition
}

export function speakText({ text, language = 'en-US', rate = 1 }) {
  if (!window.speechSynthesis || !text) return

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = language
  utterance.rate = rate
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}
