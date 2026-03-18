export interface LoginResponse {
  access_token?: string
  token?: string
  refresh_token?: string
  accessToken?: string
  refreshToken?: string
}

export interface HealthResponse {
  ok: boolean
  version: string
  env: string
}

export type Theme = 'light' | 'dark'

export type OrderStatus = 'completed' | 'pending' | 'cancelled' | 'processing'

export interface Order {
  id: string
  client: string
  date: string
  items: number
  amount: string
  status: OrderStatus
}

export interface Employee {
  initials: string
  name: string
  role: string
  dept: string
  color: string
  status: 'active' | 'vacation' | 'inactive'
}
