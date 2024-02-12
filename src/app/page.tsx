import Logo from '@/components/logo';
import SearchBar from '@/components/search-var';
import NavDrawer from './_nav-drawer';
import SignOutButton from '@/components/sign-out-button';

export default function Home() {
  return (
    <>
      <header className='bg-black text-white py-2 px-4'>
        <div>
          <div className='flex justify-around items-center gap-5'>
            <Logo className='text-4xl' />
            <SearchBar />
            <NavDrawer />
          </div>
          <p className='text-center'>Catálogo</p>
        </div>
      </header>
      <main className='pt-4'>
        <SignOutButton />
      </main>
    </>
  );
}
