import { Providers } from './providers'
import './globals.css'

export const dockUrl = process.env.NEXT_PUBLIC_TEST_URL as string;
export const apiToken = process.env.NEXT_PUBLIC_TEST_API_TOKEN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='body'>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
