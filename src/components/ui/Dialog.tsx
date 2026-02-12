// src/components/ui/Dialog.tsx
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons'; // Radix icons for close button
import { twMerge } from 'tailwind-merge';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, title, description, children }) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 z-50" />
        <DialogPrimitive.Content
          className={twMerge(
            'data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none',
          )}
        >
          <DialogPrimitive.Title className="m-0 text-[17px] font-semibold text-gray-900">
            {title}
          </DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-gray-700">
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
          <DialogPrimitive.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 focus:shadow-[0_0_0_2px] focus:shadow-green-500 focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
