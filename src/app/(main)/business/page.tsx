import { getAcountBusinesses } from '@/core/lib/business';
import { getUserByEmail } from '@/core/lib/db/users';
import { auth } from '@root/auth';
import Link from 'next/link';
import { RedirectType, redirect } from 'next/navigation';
import BusinessListPre from './_page-components/business-list-pre';
import { PlusIcon } from '@/components/icons/plus-icon';
import { Suspense } from 'react';
import ListPrevEsk from './_page-components/list-prev-ske';

async function BusinessPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login', RedirectType.replace);
  }

  const { user } = session;

  const dbUser = await getUserByEmail(user.email!);
  if (!dbUser) {
    redirect('/login', RedirectType.replace);
  }

  const res = await getAcountBusinesses(dbUser.id);
  if (!res.success || res.result.length === 0) {
    redirect('/regis-business', RedirectType.replace);
  }

  const businesses = res.result;

  return (
    <div className='p-6 space-y-5'>
      <div className='flex justify-center'>
        <Link
          href='/regis-business'
          className='bg-black rounded-md text-white px-3 py-2 flex items-center gap-1'
        >
          <PlusIcon /> Añadir
        </Link>
      </div>
      {businesses.map(bis => (
        <Suspense fallback={<ListPrevEsk />} key={bis.id}>
          <BusinessListPre business={bis} />
        </Suspense>
      ))}
    </div>
  );
}
export default BusinessPage;
