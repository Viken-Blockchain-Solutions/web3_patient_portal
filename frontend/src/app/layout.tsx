import { Providers } from "./providers";
import "./globals.css";
import { Menu } from "../components/Menu";

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='body'>
        <div>
          <Menu />
        </div>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
