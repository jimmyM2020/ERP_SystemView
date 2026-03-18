'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, Users, Settings, LogOut, Activity, BarChart3, FileText } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import styles from './Sidebar.module.css'

const NAV = [
  {
    label: 'Principal',
    items: [
      { href: '/dashboard',        label: 'Inicio',             icon: LayoutDashboard },
      { href: '/dashboard/ventas', label: 'Ventas',             icon: ShoppingCart, badge: '3' },
      { href: '/dashboard/rrhh',   label: 'Recursos Humanos',   icon: Users },
    ],
  },
  {
    label: 'Reportes',
    items: [
      { href: '/dashboard/reportes', label: 'Reportes',    icon: BarChart3 },
      // { href: '/dashboard/ajustes',  label: 'Documentos',  icon: FileText },
    ],
  },
  {
    label: 'Sistema',
    items: [
      // { href: '/dashboard/actividad', label: 'Actividad', icon: Activity },
      { href: '/dashboard/ajustes',   label: 'Ajustes',   icon: Settings },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const { logout } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await logout()
    router.push('/login')
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>ERP System</span>
          <span className={styles.logoVersion}>v1.0.0</span>
        </div>
      </div>

      {NAV.map(section => (
        <div key={section.label} className={styles.section}>
          <p className={styles.sectionLabel}>{section.label}</p>
          {section.items.map(({ href, label, icon: Icon, badge }) => (
            <Link
              key={href + label}
              href={href}
              className={`${styles.item} ${pathname === href ? styles.active : ''}`}
            >
              <Icon size={16} className={styles.icon} />
              {label}
              {badge && <span className={styles.badge}>{badge}</span>}
            </Link>
          ))}
        </div>
      ))}

      <div className={styles.spacer} />

      <div className={styles.bottom}>
        <button className={styles.logoutBtn} onClick={handleLogout} disabled={loggingOut}>
          <LogOut size={16} />
          {loggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
        </button>
      </div>
    </aside>
  )
}
