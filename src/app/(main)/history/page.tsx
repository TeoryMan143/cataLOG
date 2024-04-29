import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import { getUserOrders } from '@/core/lib/db/orders';
import OrderInfo from './_page-components/order-info';

async function HistoryPage() {
  const items = await getUserOrders();

  return (
    <div className='p-2'>
      <h1
        className={cn(
          'text-center text-white bg-black py-1 rounded-md text-2xl mb-3',
          workSans.className,
        )}
      >
        Historial de compras
      </h1>
      <div
        className='
          flex flex-col gap-2 
          lg:flex-row lg:flex-wrap
        '
      >
        {items?.map(item => <OrderInfo key={item.orderId} orderData={item} />)}
      </div>
    </div>
  );
}
export default HistoryPage;
