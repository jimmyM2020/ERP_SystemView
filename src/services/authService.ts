import axios from 'axios'
import { apiClient } from './apiClient'

export const authService = {
  login: (correo: string, contrasena: string) =>
    apiClient.post('/auth/login', { correo, contrasena }),

  refresh: (refresh_token: string) =>
    apiClient.post('/auth/refresh', { refresh_token }),

  recuperarContrasena: (correo: string) =>
    apiClient.post('/auth/recuperar-contrasena', { correo }),

  restablecerContrasena: (token: string, nueva_contrasena: string) =>
    apiClient.post('/auth/restablecer-contrasena', { token, nueva_contrasena }),

  logout: () =>
    apiClient.post('/auth/logout', {}),
}

export const systemService = {
  health: () => axios.get('http://178.62.234.17/health'),
}
