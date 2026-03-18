import { z } from 'zod'

// Block injection characters
const noInjection = /^[^<>"'`;\\{}()\[\]]*$/

const safeStr = (label: string) =>
  z.string().regex(noInjection, { message: `${label} contiene caracteres no permitidos` })

export const loginSchema = z.object({
  correo: safeStr('Correo')
    .email({ message: 'Ingresa un correo electrónico válido' })
    .max(254),
  contrasena: safeStr('Contraseña')
    .min(1, { message: 'La contraseña es requerida' })
    .max(128),
})

export const recuperarSchema = z.object({
  correo: safeStr('Correo')
    .email({ message: 'Ingresa un correo electrónico válido' })
    .max(254),
})

const passwordStrong = safeStr('Contraseña')
  .min(8,   { message: 'Mínimo 8 caracteres' })
  .max(128, { message: 'Contraseña demasiado larga' })
  .regex(/[A-Z]/,        { message: 'Debe contener al menos una mayúscula' })
  .regex(/[a-z]/,        { message: 'Debe contener al menos una minúscula' })
  .regex(/[0-9]/,        { message: 'Debe contener al menos un número' })
  .regex(/[^A-Za-z0-9]/, { message: 'Debe contener al menos un carácter especial (!@#$%...)' })
  .refine(
    (v) => !/(123456|password|qwerty|contrasena|abcabc)/i.test(v),
    { message: 'Contraseña demasiado común, elige una más segura' }
  )

export const restablecerSchema = z
  .object({
    nueva_contrasena: passwordStrong,
    confirmar: z.string().min(1, { message: 'Confirma la contraseña' }),
  })
  .refine((d) => d.nueva_contrasena === d.confirmar, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmar'],
  })

export type LoginFormData      = z.infer<typeof loginSchema>
export type RecuperarFormData  = z.infer<typeof recuperarSchema>
export type RestablecerFormData = z.infer<typeof restablecerSchema>
