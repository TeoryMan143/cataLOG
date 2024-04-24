import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { cn } from '@/core/client-utils';
import { UnitValue, units } from './data';
import { sono } from '@/core/fonts';

type Props = {
  onUnitChange: (unit: UnitValue) => void;
  initialValue?: UnitValue;
};

export function UnitSelector({ onUnitChange, initialValue }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<UnitValue>(
    initialValue ?? units[0].value,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'justify-between rounded-none h-full grox px-1 min-w-16 border-black border border-l-transparent',
            sono.className,
          )}
        >
          /{value}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Buscar medida' />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {units.map(u => (
              <CommandItem
                key={u.value}
                value={u.value}
                onSelect={currentValue => {
                  setValue(currentValue as UnitValue);
                  onUnitChange(currentValue as UnitValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === u.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <span className={sono.className}>({u.value})</span> {u.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
