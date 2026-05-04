import { ArrowRight, Bot, Leaf, Mic, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-['Baloo_2'] text-4xl font-bold text-emerald-900">{t('appName')}</h1>
          <p className="text-emerald-800/80">{t('tagline')}</p>
        </div>
        <LanguageSwitcher />
      </header>

      <section className="card grainy mb-6 overflow-hidden p-6 sm:p-10">
        <h2 className="font-['Baloo_2'] text-3xl font-bold text-emerald-900 sm:text-5xl">{t('home.title')}</h2>
        <p className="mt-3 max-w-2xl text-base text-emerald-900/80 sm:text-lg">{t('home.subtitle')}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/auth" className="btn-primary inline-flex items-center gap-2 text-base font-semibold">
            {t('home.cta')} <ArrowRight size={18} />
          </Link>
          <Link to="/dashboard" className="btn-muted inline-flex items-center gap-2 text-base font-semibold">
            Demo Dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-4 pb-8 md:grid-cols-3">
        <div className="card p-4">
          <TrendingUp className="mb-2 text-emerald-700" />
          <h3 className="font-semibold text-emerald-900">{t('home.featureOne')}</h3>
          <p className="text-sm text-emerald-800/80">Crop, fruit, vegetable, millet prices with filters.</p>
        </div>
        <div className="card p-4">
          <Mic className="mb-2 text-emerald-700" />
          <h3 className="font-semibold text-emerald-900">{t('home.featureTwo')}</h3>
          <p className="text-sm text-emerald-800/80">Speech-to-text and text-to-speech in English, Tamil, and Hindi.</p>
        </div>
        <div className="card p-4">
          <Bot className="mb-2 text-emerald-700" />
          <h3 className="font-semibold text-emerald-900">{t('home.featureThree')}</h3>
          <p className="text-sm text-emerald-800/80">Rule-based chatbot and instant mock disease suggestion.</p>
        </div>
      </section>

      <div className="card flex items-center justify-between p-4">
        <div className="flex items-center gap-2 text-emerald-900">
          <Leaf size={18} /> Built for quick 1-day demo deployment.
        </div>
        <Link to="/auth" className="btn-primary text-sm font-semibold">
          Enter App
        </Link>
      </div>
    </div>
  )
}

export default HomePage
