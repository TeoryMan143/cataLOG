import { getPaymentItems } from '@/core/lib/db/payment';
import { redirect } from 'next/navigation';
import OrderItemPrev from './_page-components/order-item-prev';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';

type Props = {
  searchParams: {
    payment_id: string;
  };
};

async function SuccessPage({ searchParams: { payment_id } }: Props) {
  const items = await getPaymentItems(payment_id);

  if (!items) {
    redirect('failure');
  }

  return (
    <div className='grid place-content-center'>
      <div>
        <h1
          className={cn(
            'text-center font-bold mb-5 text-3xl',
            workSans.className,
          )}
        >
          Orden realizada correctamente
        </h1>
        <div className='max-h-96 overflow-auto space-y-3 px-4'>
          {items.map(item => (
            <OrderItemPrev key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default SuccessPage;
