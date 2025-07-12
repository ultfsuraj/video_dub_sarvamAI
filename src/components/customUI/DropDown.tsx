import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DropDownProps {
  items: string[];
  onSelect?: (value: string) => void;
  triggerClass?: string;
  arrowClass?: string;
  dropdownContentClass?: string;
  itemClass?: string;
}

const DropDown = ({
  items,
  onSelect,
  triggerClass = '',
  arrowClass = '',
  dropdownContentClass = '',
  itemClass = '',
}: DropDownProps) => {
  const [selected, setSelected] = useState<string>(items[0]);

  const handleSelect = (val: string) => {
    setSelected(val);
    if (onSelect) {
      onSelect(val);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'flex body-sm text-gray-900 justify-between w-36 items-center gap-1 border px-3 py-1 rounded text-white bg-svm-9 hover:bg-svm-8 outline-none',
            triggerClass
          )}
        >
          {selected} <ChevronDown className={cn('ml-5 w-4 h-4', arrowClass)} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            'z-50 flex flex-col  max-h-52 overflow-y-auto  scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-md border bg-svm-1 p-1 shadow-md',
            dropdownContentClass
          )}
          sideOffset={5}
        >
          {items.length > 0
            ? items.map((item) => (
                <DropdownMenu.Item
                  key={item}
                  className={cn(
                    'px-2 py-1.5 rounded body-sm text-gray-900 hover:bg-svm-2 cursor-pointer outline-none',
                    itemClass
                  )}
                  onSelect={() => handleSelect(item)}
                >
                  {item}
                </DropdownMenu.Item>
              ))
            : null}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDown;
