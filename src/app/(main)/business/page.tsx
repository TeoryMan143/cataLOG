import { getAcountBusinesses } from '@/core/lib/business';
import { getUserByEmail } from '@/core/lib/db/users';
import { auth } from '@root/auth';
import Link from 'next/link';
import { RedirectType, redirect } from 'next/navigation';

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

  return (
    <div>
      <p>{JSON.stringify(res.result)}</p>
      <Link href='/regis-business'>Registrar</Link>
    </div>
  );
}
export default BusinessPage;
