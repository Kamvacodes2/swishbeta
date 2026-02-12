// src/components/ui/Switch.tsx
import React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { twMerge } from 'tailwind-merge';

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, label, id, ...props }, ref) => { // Destructure id here
  const switchElement = (
    <SwitchPrimitives.Root
      className={twMerge(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200",
        className
      )}
      {...props}
      ref={ref}
      id={id} // Pass id to the root primitive
    >
      <SwitchPrimitives.Thumb
        className={twMerge(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  );

  if (label) {
    return (
      <div className="flex items-center">
        {switchElement}
        <label
          htmlFor={id} // Use the destructured id here
          className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
        >
          {label}
        </label>
      </div>
    );
  }

  return switchElement;
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;