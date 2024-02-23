import { cn } from '@/core/client-utils';
import Link from 'next/link';
import React from 'react';

function SocialButton({
  children,
  className,
  href,
}: React.ComponentProps<typeof Link>) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          'p-2 bg-gray-200 rounded-lg flex items-center gap-1',
          className
        )}
      >
        {children}
      </Link>
    </li>
  );
}
export default SocialButton;
