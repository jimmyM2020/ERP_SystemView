'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar  from '@/components/dashboard/Topbar'
import styles  from './DashboardShell.module.css'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router  = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    } else {
      setReady(true)
    }
  }, [isAuthenticated, router])

  if (!ready) {
    return (
      <div className={styles.guard}>
        <span className={styles.spinner} />
        Verificando sesión…
      </div>
    )
  }

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}
