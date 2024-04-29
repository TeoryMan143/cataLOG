import { Button } from '@/components/ui/button';
import Link from 'next/link';

function PayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      {children}
      <div className='flex justify-center'>
        <Button asChild className='my-4'>
          <Link href='/'>Seguir comprando</Link>
        </Button>
      </div>
    </div>
  );
}
export default PayLayout;
