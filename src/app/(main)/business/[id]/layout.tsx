import { auth } from '@/core/auth';
import { getBusinessById } from '@/core/lib/db/business';
import { RedirectType, redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: {
    id?: string;
  };
};

async function BusinessLayout({ children, params: { id } }: Props) {
  if (!id) {
    redirect('/business', RedirectType.replace);
  }

  const business = await getBusinessById(id);

  if (!business) {
    redirect('/business', RedirectType.replace);
  }

  const { user } = await auth();

  if (user?.id !== business.accountId) {
    redirect('/business', RedirectType.replace);
  }

  return <>{children}</>;
}

export default BusinessLayout;
