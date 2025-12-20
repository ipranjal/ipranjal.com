'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    // Update hash on client side only
    setCurrentHash(window.location.hash);
    
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[80rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link 
            href="/" 
            className="text-lg font-semibold text-foreground hover:text-accent transition-colors duration-200"
          >
            Pranjal Pandey
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/') && pathname === '/'
                  ? 'text-accent'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              href="/writing"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/writing')
                  ? 'text-accent'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Writing
            </Link>
            <Link
              href="/events"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/events')
                  ? 'text-accent'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Events
            </Link>
            <Link
              href="/#how-i-work"
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === '/' && currentHash === '#how-i-work'
                  ? 'text-accent'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Collaborate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
