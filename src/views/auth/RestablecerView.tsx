'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authService } from '@/services/authService'
import { sanitize } from '@/lib/sanitize'
import { restablecerSchema, type RestablecerFormData } from '@/lib/schemas'
import AuthCard from '@/components/auth/AuthCard'
import FormField from '@/components/auth/FormField'
import AuthButton from '@/components/auth/AuthButton'
import Alert from '@/components/ui/Alert'
import styles from './RestablecerView.module.css'

interface Props {
  onSuccess: () => void
}

export default function RestablecerView({ onSuccess }: Props) {
  const [token, setToken]           = useState('')
  const [isClient, setIsClient]     = useState(false)
  const [loading, setLoading]       = useState(false)
  const [success, setSuccess]       = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    setIsClient(true)
    const params = new URLSearchParams(window.location.search)
    setToken(params.get('token') ?? '')
  }, [])

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RestablecerFormData>({
    resolver: zodResolver(restablecerSchema),
  })
  const passVal    = watch('nueva_contrasena', '')
  const confirmVal = watch('confirmar', '')

  const onSubmit = async (data: RestablecerFormData) => {
    if (!token) { setServerError('Token no encontrado en la URL.'); return }
    setServerError('')
    setLoading(true)
    try {
      await authService.restablecerContrasena(sanitize(token), sanitize(data.nueva_contrasena))
      setSuccess(true)
      setTimeout(onSuccess, 3000)
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'No se pudo restablecer la contraseña. El enlace puede haber expirado.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  const noToken = isClient && token === ''

  return (
    <AuthCard title="Nueva contraseña" subtitle="Elige una contraseña segura para tu cuenta.">
      {noToken && (
        <>
          <Alert variant="error">
            Token no encontrado. Verifica que copiaste el enlace completo del correo.
          </Alert>
          <p className={styles.linkRow}>
            <Link href="/recuperar-contrasena" className={styles.link}>Solicitar nuevo enlace</Link>
          </p>
        </>
      )}

      {!noToken && !success && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField
            label="Nueva contraseña" type="password"
            placeholder="Mínimo 8 caracteres"
            autoFocus value={passVal}
            error={errors.nueva_contrasena?.message}
            showStrength
            {...register('nueva_contrasena')}
          />
          <FormField
            label="Confirmar contraseña" type="password"
            placeholder="Repite la contraseña"
            value={confirmVal} error={errors.confirmar?.message}
            {...register('confirmar')}
          />
          {serverError && <Alert variant="error">{serverError}</Alert>}
          <AuthButton loading={loading} loadingText="Guardando...">
            Establecer nueva contraseña
          </AuthButton>
          <p className={styles.linkRow}>
            <Link href="/login" className={styles.link}>← Volver al inicio de sesión</Link>
          </p>
        </form>
      )}

      {success && (
        <>
          <Alert variant="success">
            ¡Contraseña actualizada con éxito! Redirigiendo al inicio de sesión…
          </Alert>
          <p className={styles.linkRow}>
            <Link href="/login" className={styles.link}>Ir al login ahora</Link>
          </p>
        </>
      )}
    </AuthCard>
  )
}
