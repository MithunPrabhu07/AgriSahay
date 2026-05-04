import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SpeakButton from '../components/SpeakButton'

function SettingsPage() {
  const { t, i18n } = useTranslation()
  const [voiceLang, setVoiceLang] = useState(localStorage.getItem('voiceLanguage') || i18n.language || 'en')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')
  const [rate, setRate] = useState(Number(localStorage.getItem('voiceRate') || 1))

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  const save = () => {
    localStorage.setItem('voiceLanguage', voiceLang)
    localStorage.setItem('voiceRate', String(rate))
    alert('Preferences saved')
  }

  return (
    <section className="card p-5">
      <h2 className="font-['Baloo_2'] text-3xl font-bold text-emerald-900">{t('settings.title')}</h2>

      <div className="mt-4 grid gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-emerald-900">{t('settings.language')}</label>
          <select
            className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2"
            value={i18n.language.slice(0, 2)}
            onChange={(event) => {
              i18n.changeLanguage(event.target.value)
              localStorage.setItem('appLanguage', event.target.value)
            }}
          >
            <option value="en">English</option>
            <option value="ta">Tamil</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-emerald-900">
            {t('settings.voiceLanguage')}
          </label>
          <select
            className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2"
            value={voiceLang}
            onChange={(event) => setVoiceLang(event.target.value)}
          >
            <option value="en">English</option>
            <option value="ta">Tamil</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-emerald-900">{t('settings.speechRate')}</label>
          <input
            type="range"
            min="0.7"
            max="1.3"
            step="0.1"
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
            className="w-full"
          />
          <p className="text-sm text-emerald-800/80">{rate}x</p>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-emerald-900/20 p-3">
          <p className="font-medium text-emerald-900">{t('settings.darkMode')}</p>
          <button
            className={`rounded-lg px-3 py-1 text-sm ${darkMode ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-900'}`}
            onClick={() => setDarkMode((prev) => !prev)}
            type="button"
          >
            {darkMode ? t('common.yes') : t('common.no')}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={save}>
            {t('common.save')}
          </button>
          <SpeakButton text="Settings saved successfully" rate={rate} />
        </div>
      </div>
    </section>
  )
}

export default SettingsPage
