import { cn } from '@/core/client-utils';
import Link from 'next/link';
import React from 'react';

function SocialButton({
  children,
  className,
  href,
}: React.ComponentProps<'a'>) {
  return (
    <li>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        className={cn(
          'p-2 bg-gray-200 rounded-lg flex items-center gap-1',
          className,
        )}
      >
        {children}
      </a>
    </li>
  );
}
export default SocialButton;
