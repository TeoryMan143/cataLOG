'use client';

import { cn } from '@/core/client-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import style from './style.module.css';
import { useState } from 'react';
import ProductsQuery from './query/products';
import BusinessQuery from './query/business';
import { CTagIcon } from '../icons/c-tag';

function Options({ q }: { q: string }) {
  const [tabActive, setTabActive] = useState(false);

  return (
    <Tabs
      onValueChange={v => {
        setTabActive(v === 'business');
      }}
      defaultValue='product'
      className='
        hidden absolute group-focus-within:block left-1/2 -translate-x-1/2 bg-white top-9 rounded-md border border-black w-64 z-20
        lg:w-full 
      '
    >
      <TabsList
        className={cn(
          'grid grid-cols-2 p-0 after:transition-transform relative',
          style.tabAfter,
          {
            'after:translate-x-full': tabActive,
          },
        )}
      >
        <TabsTrigger value='product' className='h-full lg:text-xl'>
          <CTagIcon /> Productos
        </TabsTrigger>
        <TabsTrigger value='business' className='h-full lg:text-xl'>
          <svg
            className='text-xl'
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 48 48'
          >
            <g fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M9.263 6c-.378 0-.715.262-.845.656L6.11 13.667a2.2 2.2 0 0 0-.11.687v2.789C6 18.72 7.151 20 8.571 20c1.42 0 2.572-1.28 2.572-2.857c0 1.578 1.151 2.857 2.571 2.857c1.42 0 2.572-1.28 2.572-2.857c0 1.578 1.151 2.857 2.571 2.857c1.42 0 2.57-1.278 2.572-2.855C21.429 18.722 22.58 20 24 20c1.42 0 2.571-1.28 2.571-2.857c0 1.578 1.152 2.857 2.572 2.857c1.42 0 2.57-1.278 2.571-2.855c.001 1.577 1.152 2.855 2.572 2.855c1.42 0 2.571-1.28 2.571-2.857c0 1.578 1.151 2.857 2.572 2.857C40.849 20 42 18.72 42 17.143v-2.789a2.2 2.2 0 0 0-.11-.687l-2.308-7.01c-.13-.395-.467-.657-.845-.657z'
                clipRule='evenodd'
              />
              <path
                fillRule='evenodd'
                d='M10 21.23V29H7.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h33a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H38v-7.77a3.916 3.916 0 0 1-1.143-.703a3.953 3.953 0 0 1-.857.576V29H12v-7.897a3.953 3.953 0 0 1-.857-.576c-.336.295-.72.535-1.143.703m26-1.957c.085-.085.165-.176.24-.273H36zM37.474 19a2.75 2.75 0 0 0 .526.519V19zM10 19.519a2.63 2.63 0 0 0 .526-.519H10zM11.76 19H12v.273a2.766 2.766 0 0 1-.24-.273M8.5 33a.5.5 0 0 0-.5.5V41a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1v-7.5a.5.5 0 0 0-.5-.5z'
                clipRule='evenodd'
              />
              <path d='M14 26.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z' />
              <path d='M16 27.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm8 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0' />
            </g>
          </svg>{' '}
          Negocios
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value='product'
        className='p-2 overflow-y-auto max-h-72 lg:max-h-96'
      >
        <ProductsQuery q={q} />
      </TabsContent>
      <TabsContent
        value='business'
        className='p-2 overflow-y-auto max-h-72 lg:max-h-96'
      >
        <BusinessQuery q={q} />
      </TabsContent>
    </Tabs>
  );
}
export default Options;
