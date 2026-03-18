'use client'
import { useEffect, useState } from 'react'
import { TrendingUp, ShoppingCart, Users, DollarSign, Zap } from 'lucide-react'
import StatCard from '@/components/dashboard/StatCard'
import { systemService } from '@/services/authService'
import styles from './HomeView.module.css'

const FEED = [
  { color: '#3b82f6', strong: 'Orden #1042',       rest: ' fue procesada exitosamente',     time: 'Hace 3 min'  },
  { color: '#10b981', strong: 'Carlos Méndez',      rest: ' completó su evaluación de Q1',   time: 'Hace 15 min' },
  { color: '#f59e0b', strong: 'Empresa XYZ',        rest: ' fue registrada como nuevo cliente', time: 'Hace 32 min' },
  { color: '#ef4444', strong: 'Producto SKU-220',   rest: ': stock bajo, requiere reposición', time: 'Hace 1 hr'   },
  { color: '#a78bfa', strong: 'Reporte mensual',    rest: ' generado y disponible',            time: 'Hace 2 hr'   },
]

export default function HomeView() {
  const [today, setToday]         = useState('')
  const [health, setHealth]       = useState<Record<string, unknown> | null>(null)
  const [healthErr, setHealthErr] = useState('')
  const [loading, setLoading]     = useState(false)

  const checkHealth = async () => {
    setHealth(null); setHealthErr(''); setLoading(true)
    try {
      const { data } = await systemService.health()
      setHealth(data)
    } catch {
      setHealthErr('No se pudo conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const formatted = new Date().toLocaleDateString('es-GT', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })
    setToday(formatted)
  }, [])

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>
        Bienvenido al <span className={styles.accent}>ERP System</span>
      </h1>
      <p className={styles.sub}>Resumen general del día · {today}</p>

      <div className={styles.statsGrid}>
        <StatCard label="Ventas del mes"    value="Q 84,230" change="+12.4% vs mes anterior" changeDir="up"      icon={DollarSign}   color="green"  />
        <StatCard label="Órdenes activas"   value="38"        change="+5 nuevas hoy"          changeDir="up"      icon={ShoppingCart} color="blue"   />
        <StatCard label="Empleados activos" value="124"       change="2 de vacaciones"         changeDir="neutral" icon={Users}        color="purple" />
        <StatCard label="Ingresos netos"    value="Q 61,890" change="-2.1% vs semana pasada"  changeDir="down"    icon={TrendingUp}   color="orange" />
      </div>

      <div className={styles.row}>
        {/* Activity feed */}
        <div className={styles.panel}>
          <p className={styles.panelTitle}><span className={styles.dot} />Actividad reciente</p>
          {FEED.map((f, i) => (
            <div key={i} className={styles.feedItem}>
              <span className={styles.feedDot} style={{ background: f.color }} />
              <div>
                <p className={styles.feedText}>
                  <strong>{f.strong}</strong>{f.rest}
                </p>
                <p className={styles.feedTime}>{f.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Health check */}
        <div className={styles.panel}>
          <p className={styles.panelTitle}><span className={styles.dot} />Estado del servidor</p>
          <p className={styles.panelSub}>
            Verifica la conectividad con el backend del sistema.
          </p>
          <button className={styles.healthBtn} onClick={checkHealth} disabled={loading}>
            {loading
              ? <><span className={styles.spinner} /> Probando…</>
              : <><Zap size={14} /> Probar conexión</>}
          </button>
          {health && (
            <div className={styles.resultBox}>
              <span className={styles.resultLabel}>GET /health · 200 OK</span>
              <pre className={styles.resultOk}>{JSON.stringify(health, null, 2)}</pre>
            </div>
          )}
          {healthErr && (
            <div className={`${styles.resultBox} ${styles.resultBoxErr}`}>
              <span className={styles.resultLabel}>Error de conexión</span>
              <pre className={styles.resultErr}>{healthErr}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
