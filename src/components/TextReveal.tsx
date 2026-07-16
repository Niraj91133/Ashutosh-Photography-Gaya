import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  type?: 'char' | 'word';
  delay?: number; // base delay in ms
  stagger?: number; // stagger delay between items in ms
  className?: string;
  variant?: 'default' | 'cinematic';
}

export default function TextReveal({
  text,
  type = 'char',
  delay = 0,
  stagger = 15,
  className = '',
  variant = 'default',
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const items = type === 'word' ? text.split(' ') : text.split('');

  const isCinematic = variant === 'cinematic';

  return (
    <span ref={ref} className={`inline ${className}`}>
      {items.map((item, idx) => {
        const isSpace = item === ' ';
        return (
          <span
            key={idx}
            className="inline-block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible 
                ? 'translateY(0)' 
                : (isCinematic ? 'translateY(12px)' : 'translateY(6px)'),
              filter: isCinematic 
                ? (isVisible ? 'blur(0px)' : 'blur(5px)') 
                : 'none',
              transformStyle: 'preserve-3d',
              transition: isCinematic
                ? 'opacity 750ms cubic-bezier(0.16, 1, 0.3, 1), transform 750ms cubic-bezier(0.16, 1, 0.3, 1), filter 750ms cubic-bezier(0.16, 1, 0.3, 1)'
                : 'opacity 250ms cubic-bezier(0.16, 1, 0.3, 1), transform 250ms cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${delay + idx * stagger}ms`,
              whiteSpace: isSpace && type === 'char' ? 'pre' : 'normal',
              marginRight: type === 'word' ? '0.18em' : '0',
            }}
          >
            {item}
          </span>
        );
      })}
    </span>
  );
}
