import Link from 'next/link';

const urls = [
  {
    id: crypto.randomUUID(),
    href: '/cart',
    text: 'Ver carrito',
  },
  {
    id: crypto.randomUUID(),
    href: '/history',
    text: 'Historial de compras',
  },
  {
    id: crypto.randomUUID(),
    href: '/businesses',
    text: 'Mis negocios',
  },
];

function NavLinks() {
  return (
    <ul>
      {urls.map(({ id, href, text }) => (
        <li key={id}>
          <Link href={href}>{text}</Link>
        </li>
      ))}
    </ul>
  );
}
export default NavLinks;
