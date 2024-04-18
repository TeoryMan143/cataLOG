import type { Metadata } from 'next';
import { openSans } from '@/core/fonts';
import './globals.css';
import { cn } from '@/core/client-utils';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { uploadRouter } from './api/uploadthing/core';
import { SessionProvider, auth } from '@/core/auth';
import { Toaster } from 'sonner';
import QueryProvider from './_page-components/query-client';
import { CartStoreProvider } from '@/core/stores/shoping-cart/context';

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
        <Toaster
          toastOptions={{
            classNames: {
              title: 'lg:text-lg',
            },
          }}
        />
        <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />
        <QueryProvider>
          <SessionProvider sessionData={sessionData}>
            <CartStoreProvider>{children}</CartStoreProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
