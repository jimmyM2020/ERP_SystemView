import ThemeToggle from '@/components/ui/ThemeToggle'
import styles from './AuthCard.module.css'

interface Props {
  title: string
  subtitle: string
  children: React.ReactNode
}

export default function AuthCard({ title, subtitle, children }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className={styles.brandName}>ERP System</span>
          </div>
          <ThemeToggle />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {children}
      </div>
    </div>
  )
}
