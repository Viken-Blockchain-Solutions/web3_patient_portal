import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({
  children
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
  );
}
