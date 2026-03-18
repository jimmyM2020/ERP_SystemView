import type { Employee } from '@/types'

export const rrhhService = {
  getEmployees: (): Employee[] => [
    { initials: 'CM', name: 'Carlos Méndez',         role: 'Gerente de Ventas',        dept: 'Ventas',   color: '#3b6cf7', status: 'active'   },
    { initials: 'AL', name: 'Ana López',              role: 'Analista de RRHH',         dept: 'RRHH',     color: '#10b981', status: 'active'   },
    { initials: 'JR', name: 'Jorge Ramírez',          role: 'Desarrollador Sr.',        dept: 'TI',       color: '#a78bfa', status: 'active'   },
    { initials: 'MP', name: 'María Pérez',            role: 'Contadora General',        dept: 'Finanzas', color: '#f59e0b', status: 'vacation' },
    { initials: 'RL', name: 'Roberto Lima',           role: 'Ejecutivo de Ventas',      dept: 'Ventas',   color: '#3b6cf7', status: 'active'   },
    { initials: 'SK', name: 'Sofia Kwan',             role: 'Diseñadora UX',            dept: 'TI',       color: '#ec4899', status: 'active'   },
    { initials: 'HM', name: 'Hugo Morales',           role: 'Soporte Técnico',          dept: 'TI',       color: '#06b6d4', status: 'inactive' },
    { initials: 'LV', name: 'Laura Vásquez',          role: 'Asistente Administrativa', dept: 'Admin',    color: '#84cc16', status: 'active'   },
  ],

  getDeptDistribution: () => [
    { dept: 'Ventas',   count: 28, pct: 22, color: 'var(--accent)'   },
    { dept: 'TI',       count: 22, pct: 18, color: 'var(--success)'  },
    { dept: 'Finanzas', count: 18, pct: 14, color: 'var(--warning)'  },
    { dept: 'Admin',    count: 16, pct: 13, color: '#a78bfa'          },
    { dept: 'RRHH',     count: 12, pct: 10, color: '#ec4899'          },
    { dept: 'Otros',    count: 28, pct: 23, color: 'var(--text-muted)'},
  ],

  getUpcomingEvents: () => [
    { date: '18 Mar', text: 'Carlos Méndez — evaluación de desempeño Q1' },
    { date: '19 Mar', text: 'Ana López — incorporación nuevo analista'    },
    { date: '20 Mar', text: 'Reunión departamental TI · 10:00 AM'         },
    { date: '22 Mar', text: 'María Pérez regresa de vacaciones'           },
    { date: '25 Mar', text: 'Cierre de planilla Marzo 2026'               },
  ],

  getStats: () => ({
    total:     124,
    activos:   118,
    vacaciones: 4,
    bajas:      2,
  }),
}
