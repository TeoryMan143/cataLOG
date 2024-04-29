import { redirect } from 'next/navigation';

type Props = {
  params: {
    id?: string;
  };
};

async function BusinessPage({ params: { id } }: Props) {
  redirect(`/business/${id}/catalog`);
}
export default BusinessPage;
