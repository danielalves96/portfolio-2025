'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  minHeight?: string;
  priority?: 'high' | 'medium' | 'low';
}

export function LazySection({
  children,
  fallback,
  rootMargin = '100px',
  threshold = 0.1,
  className = '',
  minHeight = 'auto',
  priority = 'medium',
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (priority === 'high') {
      setIsVisible(true);
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsIntersecting(true);
          setTimeout(
            () => {
              setIsVisible(true);
            },
            priority === 'low' ? 150 : 50
          );
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [rootMargin, threshold, priority]);

  return (
    <section
      ref={ref}
      className={`transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{ minHeight }}
    >
      {isIntersecting ? (
        <div
          className={`transition-all duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-4'}`}
        >
          {children}
        </div>
      ) : (
        fallback || (
          <div className='flex items-center justify-center py-20'>
            <div className='animate-pulse space-y-4 w-full max-w-4xl mx-auto px-4'>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto' />
              <div className='space-y-2'>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6' />
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6' />
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}

export function useScrollVelocityPreload() {
  const [shouldPreload, setShouldPreload] = useState(false);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollVelocity = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity.current = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      if (scrollVelocity.current > 50) {
        setShouldPreload(true);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollVelocity);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return shouldPreload;
}
