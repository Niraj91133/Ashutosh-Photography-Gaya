import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  threshold = 0.05,
  direction = 'up',
  duration = 1000,
  delay = 0,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -80px 0px',
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
  }, [threshold]);

  const getDirectionStyle = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: 'none',
      };
    }

    let transform = '';
    switch (direction) {
      case 'up':
        transform = 'translateY(50px)';
        break;
      case 'down':
        transform = 'translateY(-50px)';
        break;
      case 'left':
        transform = 'translateX(50px)';
        break;
      case 'right':
        transform = 'translateX(-50px)';
        break;
      case 'none':
      default:
        transform = 'none';
    }

    return {
      opacity: 0,
      transform,
    };
  };

  const style = {
    ...getDirectionStyle(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
