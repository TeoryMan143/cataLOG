'use client';

import { EditIcon } from '@/components/icons/edit';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function EditButton() {
  const router = useRouter();
  const params = useParams();

  return (
    <Button
      className='
        space-x-2 text-lg transition
        active:scale-95
      '
      onClick={() => {
        router.push(`${params.prodId}/edit`);
      }}
    >
      <EditIcon /> <span>Editar</span>
    </Button>
  );
}
export default EditButton;
