/**
 * Button/CTA Component
 * 
 * Call-to-action button with primary/secondary variants.
 */

import type { ButtonProps } from '@/types/content';

export function Button({
  children,
  href,
  primary = false,
  ariaLabel,
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-block px-8 py-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transform hover:scale-105';
  
  const variantStyles = primary
    ? 'bg-gradient-to-r from-accent to-accent-secondary text-background hover:shadow-lg hover:shadow-accent/50'
    : 'border border-foreground/20 text-muted hover:text-foreground hover:border-foreground/40 hover:bg-foreground/5';

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantStyles} ${className}`.trim()}
    >
      {children}
    </a>
  );
}
