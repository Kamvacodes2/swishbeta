// src/components/effects/FadeInOnScroll.tsx
import React, { useRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in ms before animation starts
  threshold?: number; // IntersectionObserver threshold
  once?: boolean; // Whether to animate only once
  yOffset?: string; // TranslateY offset, e.g., '20px'
}

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  once = true,
  yOffset = '20px',
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated)) {
            setVisible(true);
            setHasAnimated(true);
          } else if (!entry.isIntersecting && !once) {
            // Optional: reset visibility if not animating only once
            setVisible(false);
          }
        });
      },
      { threshold }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once, hasAnimated]);

  const finalClassName = twMerge(
    'transition-all duration-700 ease-out',
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0', // Manage opacity and translateY-0 here
    className,
    'transform' // Ensure transform is always enabled for transitions
  );

  const style: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
    '--tw-translate-y': isVisible ? '0' : yOffset, // Set CSS variable for custom transform value
    transform: `translateY(var(--tw-translate-y))`, // Use the CSS variable
  };

  return (
    <div ref={domRef} className={finalClassName} style={style}>
      {children}
    </div>
  );
};

export default FadeInOnScroll;
