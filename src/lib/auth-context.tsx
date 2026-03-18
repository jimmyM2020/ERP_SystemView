'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { LoginResponse } from '@/types'
import { authService } from '@/services/authService'

interface AuthCtx {
  isAuthenticated: boolean
  login: (correo: string, contrasena: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('access_token'))
    setMounted(true)
  }, [])

  const login = async (correo: string, contrasena: string) => {
    const { data } = await authService.login(correo, contrasena)
    const d = data as LoginResponse
    const access  = d.access_token  ?? d.token        ?? d.accessToken  ?? ''
    const refresh = d.refresh_token ?? d.refreshToken ?? ''
    localStorage.setItem('access_token', access)
    if (refresh) localStorage.setItem('refresh_token', refresh)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    try { await authService.logout() } catch { /* ignore */ }
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setIsAuthenticated(false)
  }

  if (!mounted) {
    return (
      <AuthContext.Provider value={{ isAuthenticated: false, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
