import { storage } from '../utils/storage'

const USERS_KEY = 'agri_users'
const SESSION_KEY = 'agri_session'

function readUsers() {
  return storage.get(USERS_KEY, [])
}

export const authService = {
  signup({ name, email, password }) {
    const users = readUsers()
    const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return { ok: false, message: 'User already exists' }
    }

    users.push({ id: crypto.randomUUID(), name, email, password })
    storage.set(USERS_KEY, users)
    return { ok: true }
  },

  login({ email, password }) {
    const users = readUsers()
    const user = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    )

    if (!user) {
      return { ok: false, message: 'Invalid credentials' }
    }

    storage.set(SESSION_KEY, { id: user.id, name: user.name, email: user.email })
    return { ok: true, user: { id: user.id, name: user.name, email: user.email } }
  },

  logout() {
    storage.remove(SESSION_KEY)
  },

  getCurrentUser() {
    return storage.get(SESSION_KEY)
  },

  isAuthenticated() {
    return Boolean(storage.get(SESSION_KEY))
  }
}
