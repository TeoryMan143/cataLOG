import Logo from '@/components/logo';
import SearchBar from '@/components/search-var';
import NavDrawer from '../_page-components/nav-drawer';
import styles from '../page.module.css';
import { cn } from '@/core/client-utils';
import AsideNav from '../_page-components/aside-nav';
import Link from 'next/link';
import { workSans } from '@/core/fonts';

export default async function Home({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'main-distribution relative h-[100dvh] max-w-[100dvw] overflow-hidden',
        styles.mainDistribution,
      )}
    >
      <header
        className={cn('bg-black text-white py-4 px-4', styles.headerArea)}
      >
        <div className='flex justify-between items-center gap-5'>
          <Link href='/' className='text-4xl'>
            <Logo />
          </Link>
          {/* <SearchBar /> */}
          <h1
            className={cn(
              'font-bold text-3xl text-white text-center flex-1',
              workSans.className,
            )}
          >
            CataLOG
          </h1>
          <NavDrawer />
        </div>
      </header>
      <main
        className={cn('overflow-y-auto overflow-x-visible', styles.mainArea)}
      >
        {children}
      </main>
      <AsideNav />
    </div>
  );
}
