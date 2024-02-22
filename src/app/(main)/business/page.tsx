import { getAcountBusinesses } from '@/core/lib/business';
import { getUserByEmail } from '@/core/lib/db/users';
import { auth } from '@root/auth';
import Link from 'next/link';
import { RedirectType, redirect } from 'next/navigation';
import BusinessListPre from './_page-components/business-list-pre';

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
    <div>
      {businesses.map(bis => (
        <BusinessListPre key={bis.id} business={bis} />
      ))}
      <Link href='/regis-business'>Registrar</Link>
    </div>
  );
}
export default BusinessPage;
