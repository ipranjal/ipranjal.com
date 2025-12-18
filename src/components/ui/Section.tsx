/**
 * Section Wrapper Component
 * 
 * Provides consistent spacing and semantic structure for content sections.
 * Supports different layout widths for visual variety.
 */

import type { SectionProps } from '@/types/content';

type LayoutWidth = 'narrow' | 'default' | 'wide' | 'full';

interface ExtendedSectionProps extends SectionProps {
  width?: LayoutWidth;
}

export function Section({ 
  id, 
  ariaLabel, 
  children, 
  className = '',
  width = 'default' 
}: ExtendedSectionProps) {
  const widthClasses = {
    narrow: 'max-w-narrow',
    default: 'max-w-content',
    wide: 'max-w-wide',
    full: 'max-w-full'
  };

  return (
    <section
      id={id}
      aria-labelledby={ariaLabel ? undefined : `${id}-heading`}
      aria-label={ariaLabel}
      className={`py-section-sm md:py-section ${className}`.trim()}
    >
      <div className={`${widthClasses[width]} mx-auto px-4 md:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
}
