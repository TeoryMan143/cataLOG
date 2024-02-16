import type { Metadata } from 'next';
import { openSans } from '@/core/fonts';
import './globals.css';
import { cn } from '@/core/client-utils';

export const metadata: Metadata = {
  title: 'cataLOG',
  description: 'Una herramienta para vender tus productos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={cn(openSans.className, 'overflow-hidden')}>
        {children}
      </body>
    </html>
  );
}
