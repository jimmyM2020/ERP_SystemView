'use client'
import { useRouter } from 'next/navigation'
import RestablecerView from '@/views/auth/RestablecerView'

export default function RestablecerPage() {
  const router = useRouter()
  return <RestablecerView onSuccess={() => router.push('/login')} />
}
