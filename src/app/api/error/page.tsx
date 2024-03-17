import { BackIcon } from '@/components/icons/back';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import Link from 'next/link';

type Props = {
  searchParams: {
    type?: string | null;
    message?: string | null;
  };
};

function ErrorPage({ searchParams: { type, message } }: Props) {
  return (
    <main className='h-dvh flex flex-col justify-center items-center gap-5'>
      <h1 className={cn('font-semibold text-4xl', workSans.className)}>
        Ha ocurrido un error
      </h1>
      <ul className='text-xl bg-gray-200 p-3 space-y-2 rounded-md'>
        <li>
          <strong>Type:</strong> {type}
        </li>
        <li>
          <strong>Message:</strong> {message}
        </li>
      </ul>
      <div className='flex justify-center'>
        <Link
          className='bg-black text-white px-3 py-2 text-lg flex items-center justify-center gap-1 rounded-md'
          href='/'
        >
          <BackIcon /> Volver a inicio
        </Link>
      </div>
    </main>
  );
}
export default ErrorPage;
