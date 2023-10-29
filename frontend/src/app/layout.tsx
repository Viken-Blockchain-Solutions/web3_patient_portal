import { Providers } from './providers'
import '../public/globals.css'
export const metadata = {
  title: 'Web3 Patient Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='body'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
