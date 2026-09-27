import { AuthSession, LoginCredentials, RegisterData, User } from '@/types/auth'

const AUTH_STORAGE_VERSION = 1
const SESSION_STORAGE_KEY = 'app_auth_session_v1'
const USERS_STORAGE_KEY = 'app_registered_users_v1'

interface StoredUserRecord extends User {
  passwordHash: string
}

const SEED_USERS: StoredUserRecord[] = [
  {
    id: 'usr_demo_01',
    name: 'Demo Developer',
    email: 'demo@example.com',
    role: 'user',
    createdAt: '2026-01-01T00:00:00.000Z',
    passwordHash: 'password123'
  }
]

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

function getRegisteredUsers(): StoredUserRecord[] {
  if (typeof window === 'undefined') return SEED_USERS
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SEED_USERS))
      return SEED_USERS
    }
    const parsed = JSON.parse(raw) as StoredUserRecord[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_USERS
  } catch {
    return SEED_USERS
  }
}

function saveRegisteredUsers(users: StoredUserRecord[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  } catch (err) {
    console.error('Failed to persist users to localStorage:', err)
  }
}

function toPublicUser(record: StoredUserRecord): User {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    role: record.role,
    createdAt: record.createdAt,
    avatar: record.avatar
  }
}

export const mockAuthService = {
  async getCurrentSession(): Promise<User | null> {
    if (typeof window === 'undefined') return null
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY)
      if (!raw) return null

      const session = JSON.parse(raw) as AuthSession
      if (session.version !== AUTH_STORAGE_VERSION) {
        localStorage.removeItem(SESSION_STORAGE_KEY)
        return null
      }

      if (Date.now() > session.expiresAt) {
        localStorage.removeItem(SESSION_STORAGE_KEY)
        return null
      }

      return session.user
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY)
      return null
    }
  },

  async login(credentials: LoginCredentials): Promise<User> {
    await delay(300)
    const normalizedEmail = credentials.email.trim().toLowerCase()
    const users = getRegisteredUsers()

    const userRecord = users.find((u) => u.email.toLowerCase() === normalizedEmail)
    if (!userRecord || userRecord.passwordHash !== credentials.password) {
      throw new Error('Invalid email or password. Please verify your credentials.')
    }

    const user = toPublicUser(userRecord)

    const durationMs = credentials.rememberMe
      ? 7 * 24 * 60 * 60 * 1000 // 7 days
      : 24 * 60 * 60 * 1000 // 24 hours

    const session: AuthSession = {
      version: AUTH_STORAGE_VERSION,
      user,
      expiresAt: Date.now() + durationMs
    }

    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
    } catch (err) {
      console.error('Failed to save auth session:', err)
    }

    return user
  },

  async register(data: RegisterData): Promise<User> {
    await delay(350)
    const normalizedEmail = data.email.trim().toLowerCase()
    const users = getRegisteredUsers()

    const existingUser = users.find((u) => u.email.toLowerCase() === normalizedEmail)
    if (existingUser) {
      throw new Error('An account with this email address already exists. Try signing in instead.')
    }

    const newUser: StoredUserRecord = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: data.name.trim(),
      email: normalizedEmail,
      role: 'user',
      createdAt: new Date().toISOString(),
      passwordHash: data.password
    }

    users.push(newUser)
    saveRegisteredUsers(users)

    const user = toPublicUser(newUser)

    const session: AuthSession = {
      version: AUTH_STORAGE_VERSION,
      user,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    }

    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
    } catch (err) {
      console.error('Failed to save auth session:', err)
    }

    return user
  },

  async logout(): Promise<void> {
    await delay(150)
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(SESSION_STORAGE_KEY)
      } catch (err) {
        console.error('Failed to clear auth session:', err)
      }
    }
  },

  async resetPassword(email: string): Promise<void> {
    await delay(300)
    const normalizedEmail = email.trim().toLowerCase()
    const users = getRegisteredUsers()

    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail)
    if (!user) {
      throw new Error('No registered account was found with that email address.')
    }
    // Simulation: Password reset email dispatched
  }
}
