'use client';

import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import Button from '@/components/button';
import { DBCategory } from '@/core/schemas/categories';
import { Checkbox } from '@/components/checkbox';
import { getCategories } from '@/core/lib/db/categories';
import { Toaster, toast } from 'sonner';
import { XIcon } from '@/components/icons/x-icon';

export function ComboboxCategories({
  onCategoriesChange,
}: {
  onCategoriesChange?: (categories: DBCategory[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<DBCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<
    DBCategory[]
  >([]);

  React.useEffect(() => {
    const run = async () => {
      const dbCategories = await getCategories();
      if (!dbCategories) return toast.error('Database error');
      setCategories(dbCategories);
    };
    run();
  }, []);

  React.useEffect(() => {
    if (onCategoriesChange) {
      onCategoriesChange(selectedCategories);
    }
  }, [selectedCategories, onCategoriesChange]);

  const deleteCategory = React.useCallback(
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
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role='combobox'
            aria-expanded={open}
            className='justify-between flex items-center w-full bg-black text-amber-50 rounded p-2'
          >
            <div className='flex gap-2 flex-1 pr-8 flex-wrap'>
              {selectedCategories.length > 0
                ? selectedCategories.map(cate => (
                    <div
                      className='text-xs bg-white rounded-sm p-1 max-w-40 text-black flex gap-1'
                      key={'sp-' + cate.id}
                    >
                      <span className='truncate max-w-32'>{cate.name}</span>
                      <XIcon
                        onClick={e => {
                          e.stopPropagation();
                          deleteCategory(cate);
                        }}
                        className='text-base flex-1'
                      />
                    </div>
                  ))
                : 'Selecciona categorías ...'}
            </div>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[300px] p-0 max-h-[260px] overflow-auto'>
          <Command>
            <CommandInput placeholder='Selecciona categorías ...' />
            <CommandEmpty>No se encontro la categoría</CommandEmpty>
            <CommandGroup className='overflow-auto'>
              {categories.map(category => (
                <CommandItem key={category.id}>
                  <label
                    htmlFor={category.id}
                    className='flex items-center gap-2 font-medium leading-none py-2'
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={chk => {
                        if (!chk) {
                          return deleteCategory(category);
                        }
                        setSelectedCategories(prev => [...prev, category]);
                      }}
                      id={category.id}
                    />
                    {category.name}
                  </label>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
