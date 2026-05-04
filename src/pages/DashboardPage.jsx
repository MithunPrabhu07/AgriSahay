import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authService } from '../services/authService'
import { marketService } from '../services/marketService'
import WeatherCard from '../components/WeatherCard'

function DashboardPage() {
  const { t } = useTranslation()
  const user = authService.getCurrentUser()
  const favorites = marketService.getFavorites()

  return (
    <div className="grid gap-4">
      <section className="card p-5">
        <h2 className="font-['Baloo_2'] text-3xl font-bold text-emerald-900">
          {t('dashboard.welcome')}, {user?.name || 'Farmer'}
        </h2>
        <p className="mt-1 text-sm text-emerald-800/80">{t('dashboard.quickActions')}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Link to="/market" className="btn-primary text-center">
            {t('dashboard.viewMarket')}
          </Link>
          <Link to="/chatbot" className="btn-muted text-center">
            {t('dashboard.askBot')}
          </Link>
          <Link to="/disease" className="btn-muted text-center">
            {t('dashboard.detect')}
          </Link>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WeatherCard />
        </div>
        <section className="card p-4">
          <h3 className="mb-2 text-lg font-semibold text-emerald-900">{t('dashboard.favorites')}</h3>
          {favorites.length ? (
            <ul className="space-y-2 text-sm text-emerald-900">
              {favorites.map((item) => (
                <li key={item} className="rounded-lg bg-emerald-50 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-emerald-800/80">No favorites saved yet. Visit Market page.</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default DashboardPage
