import type { Metadata } from 'next';
import { openSans } from '@/core/fonts';
import './globals.css';
import { auth } from '../../auth';
import { RedirectType, redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'cataLOG',
  description: 'Una herramienta para vender tus productos.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
