/**
 * Heading Component
 * 
 * Typography component for semantic headings (h1-h6) with consistent styling.
 */

import type { HeadingProps } from '@/types/content';
import React from 'react';

const headingStyles = {
  1: 'text-4xl md:text-5xl font-bold leading-tight',
  2: 'text-3xl md:text-4xl font-bold leading-tight',
  3: 'text-2xl md:text-3xl font-semibold leading-tight',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg md:text-xl font-semibold',
  6: 'text-base md:text-lg font-semibold',
} as const;

export function Heading({ level, children, className = '', id }: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const styles = headingStyles[level];

  return React.createElement(
    Tag,
    {
      id,
      className: `${styles} ${className}`.trim(),
    },
    children
  );
}
