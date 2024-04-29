'use client';

import { EditIcon } from '@/components/icons/edit';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { type OrderStatus, cn, getStatus } from '@/core/client-utils';
import { editOrderStatus } from '@/core/lib/orders';
import { SaveIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function OrderStatus({
  status,
  orderId,
}: {
  status: OrderStatus;
  orderId: string;
}) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(status);

  return (
    <div className='flex gap-1'>
      {editMode ? (
        <ToggleGroup
          variant='outline'
          type='single'
          onValueChange={val => {
            setValue(val as OrderStatus);
          }}
        >
          <ToggleGroupItem
            className='border-black data-[state=on]:border-amber-600 data-[state=on]:text-amber-600'
            value='pending'
          >
            Pendiente
          </ToggleGroupItem>
          <ToggleGroupItem
            className='border-black data-[state=on]:border-cyan-500 data-[state=on]:text-cyan-500'
            value='sent'
          >
            Enviado
          </ToggleGroupItem>
          <ToggleGroupItem
            className='border-black data-[state=on]:border-green-500 data-[state=on]:text-green-500'
            value='arrived'
          >
            Recibido
          </ToggleGroupItem>
        </ToggleGroup>
      ) : (
        <span
          className={cn(
            'rounded-md p-1 text-center grid place-content-center',
            {
              'bg-amber-600': status === 'pending',
              'bg-cyan-500': status === 'sent',
              'bg-green-500': status === 'arrived',
            },
          )}
        >
          {getStatus(status)}
        </span>
      )}
      <Button
        onClick={async () => {
          if (!editMode) {
            return setEditMode(true);
          }

          const res = await editOrderStatus({ orderId, status: value });

          console.log(res);

          if (res.success) {
            toast.success('Editado correctamente');
            setEditMode(false);
          }
        }}
      >
        {!editMode ? <EditIcon /> : <SaveIcon />}
      </Button>
    </div>
  );
}
export default OrderStatus;
