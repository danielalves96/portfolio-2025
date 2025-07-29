/**
 * Utility functions for image optimization
 */

/**
 * Generates a blur data URL for image placeholders
 */
export function generateBlurDataURL(): string {
  return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rg4UNG6EEeCHLKKLRLOO8jBu2O2gdxMkPnDKwEckq2pq7nW+RMDCkBqK3kQLKkT6cTKz2xXHuHqYI7xLTN9kYPGWMW1SBGkdCqaTTrDIGE/qQ8m8/krmJJuWw3TRG7MKRmNRmFDgFdGRNlvXNKz7vR3g8zE+ZNslfgzTH6+FtCRJHiNi3Q6Fki2UoqaNNhL4cQZNyTQs6q21BF1DQrOGj8tfhUeYB+xwK8O1Bk1e3A=`;
}

/**
 * Determines image quality based on priority
 */
export function getImageQuality(
  priority: boolean,
  isHero: boolean = false
): number {
  if (isHero) return 95;
  return priority ? 90 : 75;
}

/**
 * Generates optimized sizes attribute for responsive images
 */
export function generateSizes(
  type: 'hero' | 'project' | 'service' | 'tool'
): string {
  switch (type) {
    case 'hero':
      return '(max-width: 640px) 288px, (max-width: 768px) 384px, 320px';
    case 'project':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    case 'service':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw';
    case 'tool':
      return '(max-width: 768px) 64px, 96px';
    default:
      return '100vw';
  }
}

/**
 * Priority loading configuration
 */
export function shouldLoadWithPriority(
  index: number,
  type: 'hero' | 'project' | 'service'
): boolean {
  switch (type) {
    case 'hero':
      return true; // Hero images always priority
    case 'project':
      return index < 2; // First 2 projects
    case 'service':
      return index === 0; // First service only
    default:
      return false;
  }
}

/**
 * Loading strategy based on priority
 */
export function getLoadingStrategy(priority: boolean): 'eager' | 'lazy' {
  return priority ? 'eager' : 'lazy';
}
