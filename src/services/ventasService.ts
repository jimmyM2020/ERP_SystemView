import type { Order } from '@/types'

export const ventasService = {
  getOrders: (): Order[] => [
    { id: '#1042', client: 'Empresa ABC S.A.',     date: '18/03/2026', items: 5,  amount: 'Q 4,250.00',  status: 'completed'  },
    { id: '#1041', client: 'Tech Solutions Ltd.',   date: '18/03/2026', items: 2,  amount: 'Q 1,800.00',  status: 'processing' },
    { id: '#1040', client: 'Comercial Guate',       date: '17/03/2026', items: 8,  amount: 'Q 9,120.00',  status: 'completed'  },
    { id: '#1039', client: 'Inversiones XYZ',       date: '17/03/2026', items: 1,  amount: 'Q   550.00',  status: 'pending'    },
    { id: '#1038', client: 'Distribuidora Norte',   date: '16/03/2026', items: 12, amount: 'Q 15,300.00', status: 'completed'  },
    { id: '#1037', client: 'Grupo Empresarial SA',  date: '16/03/2026', items: 3,  amount: 'Q 2,100.00',  status: 'cancelled'  },
    { id: '#1036', client: 'Servicios Digitales',   date: '15/03/2026', items: 6,  amount: 'Q 7,450.00',  status: 'completed'  },
  ],

  getStats: () => ({
    totalMes:    'Q 84,230',
    ordenes:     38,
    ticketProm:  'Q 2,217',
    pendientes:  4,
  }),
}
