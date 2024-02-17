import { getAcountBusinesses } from '@/core/lib/business';
import { getUserByEmail } from '@/core/lib/db/users';
import { auth } from '@root/auth';
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
    redirect('/business/register', RedirectType.replace);
  }

  return <div>{JSON.stringify(res.result)}</div>;
}
export default BusinessPage;
