import Logo from '@/components/logo';
import SearchBar from '@/components/search-var';
import NavDrawer from './_page-components/nav-drawer';
import { auth } from '../../auth';
import { SessionProvider } from 'next-auth/react';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <header className='bg-black text-white py-2 px-4 relative'>
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
      <main className='pt-4'></main>
    </>
  );
}
