import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const options = [
  { code: 'en', label: 'EN' },
  { code: 'ta', label: 'TA' },
  { code: 'hi', label: 'HI' }
]

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('appLanguage', code)
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-emerald-900/15 bg-white/80 px-2 py-1">
      <Languages size={16} className="text-emerald-800" />
      {options.map((option) => {
        const active = i18n.language?.startsWith(option.code)
        return (
          <button
            key={option.code}
            onClick={() => changeLanguage(option.code)}
            className={`rounded-lg px-2 py-1 text-xs font-semibold ${
              active ? 'bg-emerald-700 text-white' : 'text-emerald-900'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
