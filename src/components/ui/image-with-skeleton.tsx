'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  aspectRatio?: string;
}

export function ImageWithSkeleton({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes,
  quality = 75,
  priority = false,
  loading = 'lazy',
  placeholder = 'blur',
  blurDataURL,
  aspectRatio = 'aspect-[21/9]',
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${aspectRatio}`}>
      {/* Skeleton */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-orange-100/20 to-orange-200/20 dark:from-orange-900/10 dark:to-orange-800/10' />
      </div>

      {/* Image */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          className={`${className} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes={sizes}
          quality={quality}
          priority={priority}
          loading={loading}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
