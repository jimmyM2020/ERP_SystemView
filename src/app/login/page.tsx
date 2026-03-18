import dynamic from 'next/dynamic'

const LoginPage = dynamic(() => import('@/page/auth/LoginPage'), { ssr: false })

export default function Page() {
	return <LoginPage />
}
