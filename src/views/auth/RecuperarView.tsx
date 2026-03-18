'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authService } from '@/services/authService'
import { sanitize } from '@/lib/sanitize'
import { recuperarSchema, type RecuperarFormData } from '@/lib/schemas'
import AuthCard from '@/components/auth/AuthCard'
import FormField from '@/components/auth/FormField'
import AuthButton from '@/components/auth/AuthButton'
import Alert from '@/components/ui/Alert'
import styles from './RecuperarView.module.css'

export default function RecuperarView() {
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RecuperarFormData>({
    resolver: zodResolver(recuperarSchema),
  })
  const correoVal = watch('correo', '')

  const onSubmit = async (data: RecuperarFormData) => {
    setServerError('')
    setLoading(true)
    try {
      await authService.recuperarContrasena(sanitize(data.correo))
      setSuccess(true)
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'No se pudo enviar el correo. Verifica la dirección ingresada.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Recuperar contraseña"
      subtitle="Te enviaremos un enlace para restablecer tu acceso."
    >
      {!success ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField
            label="Correo electrónico" type="email"
            placeholder="usuario@empresa.com"
            autoFocus value={correoVal} error={errors.correo?.message}
            {...register('correo')}
          />
          {serverError && <Alert variant="error">{serverError}</Alert>}
          <AuthButton loading={loading} loadingText="Enviando...">
            Enviar enlace de recuperación
          </AuthButton>
        </form>
      ) : (
        <Alert variant="success">
          Correo enviado a <strong>{correoVal}</strong>. Revisa tu bandeja y haz clic en el enlace para continuar.
        </Alert>
      )}
      <p className={styles.linkRow}>
        <Link href="/login" className={styles.link}>← Volver al inicio de sesión</Link>
      </p>
    </AuthCard>
  )
}
