/**
 * Optimized Image Component with WebP and JPEG Fallback
 * 
 * Automatically serves WebP for browsers that support it,
 * with JPEG fallback for older browsers.
 */

import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  fill?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  loading = 'lazy',
  sizes,
  fill = false
}: OptimizedImageProps) {
  // Check if the source is a WebP image
  const isWebP = src.endsWith('.webp');
  
  // Generate JPEG fallback path by replacing .webp with .jpg
  const jpegFallback = isWebP ? src.replace('.webp', '.jpg') : src;
  
  // For WebP images, use picture element for proper fallback
  if (isWebP && !fill) {
    return (
      <picture>
        <source srcSet={src} type="image/webp" />
        <source srcSet={jpegFallback} type="image/jpeg" />
        <Image
          src={jpegFallback}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          loading={loading}
          sizes={sizes}
        />
      </picture>
    );
  }
  
  // For fill images or non-WebP, use standard Image component
  // (Next.js handles optimization automatically)
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        loading={loading}
        sizes={sizes}
      />
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={loading}
      sizes={sizes}
    />
  );
}
