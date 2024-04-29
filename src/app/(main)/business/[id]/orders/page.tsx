import { getBusinessOrders } from '@/core/lib/db/orders';
import Order from './_page-components/order';

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

async function OrdersPage({ children, params: { id } }: Props) {
  const orders = await getBusinessOrders(id);

  if (!orders) {
    return <p className='text-center text-xl'>Sin pedidos</p>;
  }

  return (
    <div className='grid grid-cols-2'>
      {orders.map(ord => (
        <Order key={ord.orderId} orderData={ord} />
      ))}
    </div>
  );
}
export default OrdersPage;
