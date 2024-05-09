'use client';

import { Checkbox } from '@/components/checkbox';
import LoadingSpin from '@/components/icons/loading-spin';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import { getCategories } from '@/core/lib/db/categories';
import { DBCategory } from '@/core/schemas/categories';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type Props = {
  onCategoriesChange: (categories: DBCategory[]) => void;
  onMinPriceCommit: (val: number | null) => void;
  onMaxPriceCommit: (val: number | null) => void;
};

function FilterDrawer({
  onCategoriesChange,
  onMinPriceCommit,
  onMaxPriceCommit,
}: Props) {
  const [active, setActive] = useState(false);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const [minEnabled, setMinEnabled] = useState(false);
  const [maxEnabled, setMaxEnabled] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<DBCategory[]>(
    [],
  );
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setActive(false));

  useEffect(() => {
    onCategoriesChange(selectedCategories);
  }, [selectedCategories, onCategoriesChange]);

  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['get-categories'],
    queryFn: async () => {
      const res = await getCategories();

      if (!res) {
        throw new Error('Categories not found');
      }

      return res;
    },
  });

  const deleteCategory = useCallback(
    (cate: DBCategory) => {
      setSelectedCategories(prev => {
        const index = prev.indexOf(cate);
        if (index > -1) {
          prev.splice(index, 1);
        }
        return [...prev];
      });
    },
    [setSelectedCategories],
  );

  return (
    <div
      className={cn(
        'fixed h-full bg-white p-2 -translate-x-full transition-transform max-w-[55dvw] z-20',
        {
          'translate-x-0': active,
        },
      )}
      ref={ref}
    >
      <nav className='overflow-y-auto h-full p-2'>
        <h3 className='font-bold text-2xl mb-2'>Precio</h3>
        <div className='flex flex-col gap-3 mb-5'>
          <div className='flex gap-2 items-center'>
            <Checkbox
              onCheckedChange={chk => {
                if (chk !== 'indeterminate') {
                  setMinEnabled(chk);
                }

                onMinPriceCommit(chk ? minPrice : null);
              }}
            />
            <div
              className={cn('flex-1 opacity-40', {
                'opacity-100': minEnabled,
              })}
            >
              <p className='text-center'>Min: {minPrice ?? ''}</p>
              <Slider
                onValueChange={([val]) => setMinPrice(val)}
                onValueCommit={([val]) => onMinPriceCommit(val)}
                min={0}
                max={200000}
                value={minPrice ? [minPrice] : undefined}
                disabled={!minEnabled}
              />
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <Checkbox
              onCheckedChange={chk => {
                if (chk !== 'indeterminate') {
                  setMaxEnabled(chk);
                }
                onMaxPriceCommit(chk ? maxPrice : null);
              }}
            />
            <div
              className={cn('flex-1 opacity-40', {
                'opacity-100': maxEnabled,
              })}
            >
              <p className='text-center'>Max: {maxPrice ?? ''}</p>
              <Slider
                onValueChange={([val]) => setMaxPrice(val)}
                onValueCommit={([val]) => onMaxPriceCommit(val)}
                min={0}
                max={200000}
                value={maxPrice ? [maxPrice] : undefined}
                disabled={!maxEnabled}
              />
            </div>
          </div>
        </div>
        <h3 className='font-bold text-2xl mb-2'>Categorias</h3>
        <div className='flex flex-col gap-2'>
          {isLoading && (
            <LoadingSpin className='text-3xl absolute left-1/2 top-1/2 traslate-x-1/2 traslate-y-1/2' />
          )}
          {error && (
            <p className=' text-red-600'>
              Ha ocurrido un error: {error.message}
            </p>
          )}
          {categories?.map(cat => (
            <label
              className='space-x-2 cursor-pointer flex items-center'
              htmlFor={cat.id}
              key={cat.id}
            >
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={chk => {
                  if (!chk) {
                    return deleteCategory(cat);
                  }
                  setSelectedCategories(prev => [...prev, cat]);
                }}
                id={cat.id}
              >
                {cat.name}
              </Checkbox>
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </nav>
      <button
        className={cn(
          'absolute top-1/2 text-sm -translate-y-1/2 -right-12 bg-white rounded-md [writing-mode:vertical-rl] [text-orientation:upright] flex   items-center px-1 py-2 flex-col-reverse opacity-70',
          workSans.className,
          {
            'opacity-100': active,
          },
        )}
        onClick={() => setActive(!active)}
      >
        <p>Filtros</p>
        <ChevronRight
          className={cn('transition-transform', { 'rotate-180': active })}
        />
      </button>
    </div>
  );
}
export default FilterDrawer;
