'use client'
import { Plus, ShoppingCart, DollarSign, TrendingUp, Clock } from 'lucide-react'
import StatCard from '@/components/dashboard/StatCard'
import { ventasService } from '@/services/ventasService'
import type { OrderStatus } from '@/types'
import styles from './VentasView.module.css'

const STATUS_LABEL: Record<OrderStatus, string> = {
  completed:  'Completada',
  pending:    'Pendiente',
  cancelled:  'Cancelada',
  processing: 'En proceso',
}

export default function VentasView() {
  const orders = ventasService.getOrders()
  const stats  = ventasService.getStats()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Ventas y Órdenes</h1>
          <p className={styles.subtitle}>Gestión de pedidos y seguimiento de ventas</p>
        </div>
        <button className={styles.addBtn}><Plus size={14} /> Nueva orden</button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Total del mes"   value={stats.totalMes}             change="+12.4%"            changeDir="up"      icon={DollarSign}   color="green"  />
        <StatCard label="Órdenes totales" value={String(stats.ordenes)}      change="5 hoy"             changeDir="up"      icon={ShoppingCart} color="blue"   />
        <StatCard label="Ticket promedio" value={stats.ticketProm}           change="+8.1%"             changeDir="up"      icon={TrendingUp}   color="purple" />
        <StatCard label="Pendientes"      value={String(stats.pendientes)}   change="Requieren acción"  changeDir="down"    icon={Clock}        color="orange" />
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <p className={styles.panelTitle}><span className={styles.dot} />Órdenes recientes</p>
          <span className={`${styles.badge} ${styles.blue}`}>Marzo 2026</span>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Orden</th><th>Cliente</th><th>Fecha</th>
                <th>Artículos</th><th>Monto</th><th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td><span className={styles.orderId}>{o.id}</span></td>
                  <td><span className={styles.clientName}>{o.client}</span></td>
                  <td>{o.date}</td>
                  <td>{o.items}</td>
                  <td><span className={styles.amount}>{o.amount}</span></td>
                  <td>
                    <span className={`${styles.pill} ${styles[o.status]}`}>
                      <span className={styles.pillDot} />
                      {STATUS_LABEL[o.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
