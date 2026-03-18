import dynamic from 'next/dynamic'

const RecuperarPage = dynamic(() => import('@/page/auth/RecuperarPage'), { ssr: false })

export default function Page() {
	return <RecuperarPage />
}
