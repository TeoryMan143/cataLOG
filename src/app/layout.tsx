import type { Metadata } from 'next';
import { openSans } from '@/core/fonts';
import './globals.css';
import { cn } from '@/core/client-utils';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { uploadRouter } from './api/uploadthing/core';
import { SessionProvider, auth } from '@/core/auth';

export const metadata: Metadata = {
  title: 'cataLOG',
  description: 'Una herramienta para vender tus productos.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionData = await auth();

  return (
    <html lang='es'>
      <body className={cn(openSans.className, 'overflow-hidden')}>
        <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />
        <SessionProvider sessionData={sessionData}>{children}</SessionProvider>
      </body>
    </html>
  );
}
