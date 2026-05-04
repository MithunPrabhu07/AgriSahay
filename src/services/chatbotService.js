import rules from '../data/chatbotRules.json'

function normalize(text) {
  return text.toLowerCase().trim()
}

export function getBotResponse(input) {
  const normalized = normalize(input)

  const matched = rules.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())),
  )

  if (matched) return matched.answer

  return 'Try asking about irrigation, pest control, fertilizer, tomato disease, or weather planning.'
}
