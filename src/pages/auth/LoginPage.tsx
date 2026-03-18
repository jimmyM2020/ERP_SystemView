'use client'
import { useRouter } from 'next/navigation'
import LoginView from '@/views/auth/LoginView'

export default function LoginPage() {
  const router = useRouter()
  return <LoginView onSuccess={() => router.push('/dashboard')} />
}
