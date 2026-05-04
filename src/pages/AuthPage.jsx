import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

function AuthPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const submit = (event) => {
    event.preventDefault()
    setMessage('')

    if (mode === 'signup') {
      const signupResult = authService.signup(form)
      if (!signupResult.ok) {
        setMessage(t('auth.exists'))
        return
      }
    }

    const loginResult = authService.login({ email: form.email, password: form.password })

    if (!loginResult.ok) {
      setMessage(t('auth.invalid'))
      return
    }

    setMessage(t('auth.success'))
    const next = location.state?.from || '/dashboard'
    navigate(next)
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl items-center px-4 py-6">
      <section className="card w-full p-6 sm:p-8">
        <h1 className="font-['Baloo_2'] text-3xl font-bold text-emerald-900">{t('auth.title')}</h1>
        <p className="mb-6 mt-1 text-sm text-emerald-800/70">
          {mode === 'login' ? t('auth.login') : t('auth.signup')}
        </p>

        <form onSubmit={submit} className="space-y-3">
          {mode === 'signup' && (
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              placeholder={t('auth.name')}
              className="w-full rounded-xl border border-emerald-900/20 px-4 py-3"
            />
          )}
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            placeholder={t('auth.email')}
            className="w-full rounded-xl border border-emerald-900/20 px-4 py-3"
          />
          <input
            type="password"
            required
            minLength={4}
            value={form.password}
            onChange={(event) => update('password', event.target.value)}
            placeholder={t('auth.password')}
            className="w-full rounded-xl border border-emerald-900/20 px-4 py-3"
          />

          <button type="submit" className="btn-primary w-full font-semibold">
            {t('auth.submit')}
          </button>
        </form>

        {message && <p className="mt-3 text-sm text-emerald-900">{message}</p>}

        <button
          onClick={() => setMode((prev) => (prev === 'login' ? 'signup' : 'login'))}
          className="mt-4 text-sm font-semibold text-emerald-700"
          type="button"
        >
          {mode === 'login' ? t('auth.switchToSignup') : t('auth.switchToLogin')}
        </button>
      </section>
    </div>
  )
}

export default AuthPage
