import { BotMessageSquare, Leaf, LayoutDashboard, LogOut, Settings, Sprout, TrendingUp } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import { authService } from '../services/authService'

const navStyles = ({ isActive }) =>
  `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-emerald-700 text-white' : 'text-emerald-950 hover:bg-emerald-100'
  }`

function AppLayout() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const logout = () => {
    authService.logout()
    navigate('/auth')
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6">
      <header className="card grainy mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Baloo_2'] text-3xl font-bold text-emerald-900">{t('appName')}</h1>
          <p className="text-sm text-emerald-800/80">{t('tagline')}</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button className="btn-muted" type="button" onClick={logout}>
            <span className="inline-flex items-center gap-2">
              <LogOut size={16} /> {t('nav.logout')}
            </span>
          </button>
        </div>
      </header>

      <nav className="card mb-4 overflow-x-auto p-2">
        <div className="flex min-w-max items-center gap-2">
          <NavLink className={navStyles} to="/dashboard">
            <LayoutDashboard size={17} /> {t('nav.dashboard')}
          </NavLink>
          <NavLink className={navStyles} to="/market">
            <TrendingUp size={17} /> {t('nav.market')}
          </NavLink>
          <NavLink className={navStyles} to="/chatbot">
            <BotMessageSquare size={17} /> {t('nav.chatbot')}
          </NavLink>
          <NavLink className={navStyles} to="/disease">
            <Leaf size={17} /> {t('nav.disease')}
          </NavLink>
          <NavLink className={navStyles} to="/settings">
            <Settings size={17} /> {t('nav.settings')}
          </NavLink>
          <NavLink className={navStyles} to="/">
            <Sprout size={17} /> {t('nav.home')}
          </NavLink>
        </div>
      </nav>

      <main className="pb-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
