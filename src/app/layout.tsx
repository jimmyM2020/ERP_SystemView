import type { Metadata } from 'next'
import '@/styles/globals.css'
import { AuthProvider }  from '@/lib/auth-context'
import { ThemeProvider } from '@/lib/theme-context'

export const metadata: Metadata = {
  title: 'ERP System',
  description: 'Enterprise Resource Planning',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
