'use client'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/ui/ThemeToggle'
import styles from './Topbar.module.css'

const LABELS: Record<string, { crumb: string; title: string }> = {
  '/dashboard':          { crumb: 'ERP / Inicio',           title: 'Panel Principal' },
  '/dashboard/ventas':   { crumb: 'ERP / Ventas',           title: 'Ventas y Órdenes' },
  '/dashboard/rrhh':     { crumb: 'ERP / RRHH',             title: 'Recursos Humanos' },
  '/dashboard/reportes': { crumb: 'ERP / Reportes',         title: 'Reportes' },
  '/dashboard/ajustes':  { crumb: 'ERP / Ajustes',          title: 'Ajustes del Sistema' },
}

export default function Topbar() {
  const pathname = usePathname()
  const info = LABELS[pathname] ?? { crumb: 'ERP', title: 'ERP System' }
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <span className={styles.crumb}>{info.crumb}</span>
        <span className={styles.title}>{info.title}</span>
      </div>
      <div className={styles.right}>
        <ThemeToggle />
        <div className={styles.chip}>
          <div className={styles.avatar}>U</div>
          <span className={styles.name}>Usuario</span>
          <span className={styles.dot} />
        </div>
      </div>
    </header>
  )
}
