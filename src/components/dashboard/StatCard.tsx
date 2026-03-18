import { type LucideIcon } from 'lucide-react'
import styles from './StatCard.module.css'

type Color = 'blue' | 'green' | 'orange' | 'red' | 'purple'
type Dir   = 'up' | 'down' | 'neutral'

interface Props {
  label: string
  value: string
  change?: string
  changeDir?: Dir
  icon: LucideIcon
  color?: Color
}

export default function StatCard({ label, value, change, changeDir = 'neutral', icon: Icon, color = 'blue' }: Props) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.inner}>
        <div>
          <p className={styles.label}>{label}</p>
          <p className={styles.value}>{value}</p>
          {change && (
            <p className={`${styles.change} ${styles[changeDir]}`}>
              {changeDir === 'up' ? '↑' : changeDir === 'down' ? '↓' : '·'} {change}
            </p>
          )}
        </div>
        <div className={styles.iconWrap}><Icon size={20} /></div>
      </div>
    </div>
  )
}
