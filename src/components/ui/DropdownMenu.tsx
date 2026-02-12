// src/components/ui/DropdownMenu.tsx
import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { twMerge } from 'tailwind-merge';

interface DropdownMenuItem {
  key: string;
  label: string;
  onSelect: () => void;
  icon?: React.ReactNode;
  withDivider?: boolean;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, items }) => {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className={twMerge(
            'data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[200px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] z-50'
          )}
          sideOffset={5}
        >
          {items.map((item) => (
            <React.Fragment key={item.key}>
              <DropdownMenuPrimitive.Item
                className="group relative flex h-[25px] select-none items-center rounded-[3px] px-[10px] pl-[25px] text-[13px] leading-none text-gray-700 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[highlighted]:text-white data-[disabled]:text-gray-400"
                onSelect={item.onSelect}
              >
                {item.icon && <span className="absolute left-[8px]">{item.icon}</span>}
                {item.label}
              </DropdownMenuPrimitive.Item>
              {item.withDivider && <DropdownMenuPrimitive.Separator className="h-[1px] bg-gray-200 m-[5px]" />}
            </React.Fragment>
          ))}
          <DropdownMenuPrimitive.Arrow className="fill-white" />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};

export default DropdownMenu;
