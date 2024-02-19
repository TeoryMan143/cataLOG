import Logo from '@/components/logo';
import SearchBar from '@/components/search-var';
import NavDrawer from '../_page-components/nav-drawer';
import { auth } from '../../../auth';
import { SessionProvider } from 'next-auth/react';
import styles from '../page.module.css';
import { cn } from '@/core/client-utils';
import AsideNav from '../_page-components/aside-nav';

export default async function Home({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div
      className={cn(
        'main-distribution relative h-[100dvh] max-w-[100dvw] overflow-hidden',
        styles.mainDistribution
      )}
    >
      <header
        className={cn('bg-black text-white py-2 px-4', styles.headerArea)}
      >
        <div>
          <div className='flex justify-around items-center gap-5'>
            <Logo className='text-4xl' />
            <SearchBar />
            <SessionProvider session={session}>
              <NavDrawer />
            </SessionProvider>
          </div>
          <p className='text-center'>Catálogo</p>
        </div>
      </header>
      <main className={cn('overflow-auto', styles.mainArea)}>{children}</main>
      <SessionProvider session={session}>
        <AsideNav />
      </SessionProvider>
    </div>
  );
}
