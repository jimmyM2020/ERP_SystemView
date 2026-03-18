import dynamic from 'next/dynamic'

const RestablecerPage = dynamic(() => import('@/page/auth/RestablecerPage'), { ssr: false })

export default function Page() {
	return <RestablecerPage />
}
