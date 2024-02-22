'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const path = usePathname();
  return (
    <div>
      <h2>Not Found: {path}</h2>
      <p>No se pudo encontrar la pagina</p>
      <p>
        Ir a <Link href='/'>Inicio</Link>
      </p>
    </div>
  );
}
