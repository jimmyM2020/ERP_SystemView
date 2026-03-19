import axios from 'axios'

const BASE_URL = '/api/v1'

export const apiClient = axios.create({ baseURL: BASE_URL })

// Attach token on every request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-refresh on 401
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) throw new Error('no refresh token')
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refresh_token: refreshToken })
        const newToken = data.access_token ?? data.token ?? ''
        localStorage.setItem('access_token', newToken)
        if (data.refresh_token) localStorage.setItem('refresh_token', data.refresh_token)
        original.headers.Authorization = `Bearer ${newToken}`
        return apiClient(original)
      } catch {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
