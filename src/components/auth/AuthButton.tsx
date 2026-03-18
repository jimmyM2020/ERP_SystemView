import styles from './AuthButton.module.css'

interface Props {
  loading?: boolean
  loadingText?: string
  children: React.ReactNode
  type?: 'submit' | 'button'
  onClick?: () => void
  disabled?: boolean
}

export default function AuthButton({
  loading, loadingText = 'Procesando...', children, type = 'submit', onClick, disabled,
}: Props) {
  return (
    <button
      type={type}
      className={styles.btn}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading
        ? <><span className={styles.spinner} />{loadingText}</>
        : children}
    </button>
  )
}
