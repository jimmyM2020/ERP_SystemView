'use client'
import { useState, forwardRef, InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import styles from './FormField.module.css'

type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong'

function calcStrength(val: string): { level: StrengthLevel; score: number; label: string } {
  let score = 0
  if (val.length >= 8)           score++
  if (/[A-Z]/.test(val))         score++
  if (/[0-9]/.test(val))         score++
  if (/[^A-Za-z0-9]/.test(val))  score++
  const map: Record<number, { level: StrengthLevel; label: string }> = {
    0: { level: 'weak',   label: 'Muy débil' },
    1: { level: 'weak',   label: 'Débil' },
    2: { level: 'fair',   label: 'Regular' },
    3: { level: 'good',   label: 'Buena' },
    4: { level: 'strong', label: 'Fuerte' },
  }
  return { ...map[score], score }
}

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  error?: string
  showStrength?: boolean
}

const FormField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, showStrength, type, value = '', ...rest }, ref) => {
    const [visible, setVisible] = useState(false)
    const isPassword = type === 'password'
    const inputType  = isPassword && visible ? 'text' : type

    const strength = isPassword && showStrength && String(value).length > 0
      ? calcStrength(String(value))
      : null

    return (
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrap}>
          <input
            ref={ref}
            {...rest}
            type={inputType}
            value={value}
            className={[styles.input, isPassword && styles.hasToggle, error && styles.errored]
              .filter(Boolean).join(' ')}
          />
          {isPassword && (
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setVisible(v => !v)}
              tabIndex={-1}
              aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {visible ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          )}
        </div>

        {strength && (
          <div className={styles.strengthWrap}>
            <div className={styles.bars}>
              {[0,1,2,3].map(i => (
                <div
                  key={i}
                  className={[styles.bar, i < strength.score && styles[`filled_${strength.level}`]]
                    .filter(Boolean).join(' ')}
                />
              ))}
            </div>
            <span className={`${styles.strengthLabel} ${styles[strength.level]}`}>
              {strength.label}
            </span>
          </div>
        )}

        {error && (
          <p className={styles.errorMsg}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = 'FormField'
export default FormField
