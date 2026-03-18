'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/lib/auth-context'
import { sanitize } from '@/lib/sanitize'
import { loginSchema, type LoginFormData } from '@/lib/schemas'
import AuthCard from '@/components/auth/AuthCard'
import FormField from '@/components/auth/FormField'
import AuthButton from '@/components/auth/AuthButton'
import Alert from '@/components/ui/Alert'
import styles from './LoginView.module.css'

interface Props {
  onSuccess: () => void
}

export default function LoginView({ onSuccess }: Props) {
  const { login } = useAuth()
  const [serverError, setServerError] = useState('')
  const [loading, setLoading]         = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const correoVal = watch('correo', '')
  const passVal   = watch('contrasena', '')

  const onSubmit = async (data: LoginFormData) => {
    setServerError('')
    setLoading(true)
    try {
      await login(sanitize(data.correo), sanitize(data.contrasena))
      onSuccess()
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string; error?: string } } })
          ?.response?.data?.message ??
        (err as { response?: { data?: { error?: string } } })
          ?.response?.data?.error ??
        'Credenciales incorrectas. Intenta de nuevo.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Iniciar sesión" subtitle="Ingresa tus credenciales para acceder al sistema.">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Correo electrónico" type="email"
          placeholder="usuario@empresa.com"
          autoFocus autoComplete="email"
          value={correoVal} error={errors.correo?.message}
          {...register('correo')}
        />
        <FormField
          label="Contraseña" type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={passVal} error={errors.contrasena?.message}
          {...register('contrasena')}
        />
        {serverError && <Alert variant="error">{serverError}</Alert>}
        <AuthButton loading={loading} loadingText="Verificando...">Iniciar sesión</AuthButton>
      </form>
      <p className={styles.linkRow}>
        ¿Olvidaste tu contraseña?{' '}
        <Link href="/recuperar-contrasena" className={styles.link}>Recupérala aquí</Link>
      </p>
    </AuthCard>
  )
}
