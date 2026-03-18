'use client'
import { Plus, Users, UserCheck, UserX, Calendar } from 'lucide-react'
import StatCard from '@/components/dashboard/StatCard'
import { rrhhService } from '@/services/rrhhService'
import styles from './RrhhView.module.css'

const STATUS_LABEL = { active: 'Activo', vacation: 'Vacaciones', inactive: 'Inactivo' }

export default function RrhhView() {
  const employees = rrhhService.getEmployees()
  const depts     = rrhhService.getDeptDistribution()
  const events    = rrhhService.getUpcomingEvents()
  const stats     = rrhhService.getStats()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Recursos Humanos</h1>
          <p className={styles.subtitle}>Gestión de personal y seguimiento de empleados</p>
        </div>
        <button className={styles.addBtn}><Plus size={14} /> Nuevo empleado</button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Total empleados" value={String(stats.total)}     change="2 nuevos este mes"     changeDir="up"      icon={Users}     color="blue"   />
        <StatCard label="Activos hoy"     value={String(stats.activos)}   change="95.2% asistencia"      changeDir="up"      icon={UserCheck} color="green"  />
        <StatCard label="Vacaciones"      value={String(stats.vacaciones)} change="Regresan esta semana" changeDir="neutral" icon={Calendar}  color="orange" />
        <StatCard label="Bajas este mes"  value={String(stats.bajas)}     change="vs 1 mes anterior"     changeDir="down"    icon={UserX}     color="red"    />
      </div>

      <div className={styles.grid2}>
        {/* Events */}
        <div className={styles.panel}>
          <p className={styles.panelTitle}><span className={styles.dot} />Eventos próximos</p>
          {events.map((e, i) => (
            <div key={i} className={styles.eventItem}>
              <span className={styles.eventDate}>{e.date}</span>
              <span className={styles.eventText}>{e.text}</span>
            </div>
          ))}
        </div>

        {/* Dept distribution */}
        <div className={styles.panel}>
          <p className={styles.panelTitle}><span className={styles.dot} />Distribución por departamento</p>
          {depts.map(d => (
            <div key={d.dept} className={styles.deptRow}>
              <div className={styles.deptMeta}>
                <span className={styles.deptName}>{d.dept}</span>
                <span className={styles.deptCount}>{d.count} · {d.pct}%</span>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${d.pct}%`, background: d.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Directory */}
      <div className={styles.panel}>
        <p className={styles.panelTitle}><span className={styles.dot} />Directorio de empleados</p>
        <div className={styles.empGrid}>
          {employees.map(e => (
            <div key={e.name} className={styles.empCard}>
              <div className={styles.empAvatar} style={{ background: e.color }}>{e.initials}</div>
              <p className={styles.empName}>{e.name}</p>
              <p className={styles.empRole}>{e.role}</p>
              <span className={styles.empDept}>{e.dept}</span>
              <div className={styles.empStatus}>
                <span className={`${styles.statusDot} ${styles[e.status]}`} />
                {STATUS_LABEL[e.status]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
