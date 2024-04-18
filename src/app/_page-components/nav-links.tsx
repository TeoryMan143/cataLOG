import NavLink from './nav-link';
import CartLink from './nav-link/cart';
import SignOutButton from './nav-link/sign-out-button';
import urls from './urls-data';

function NavLinks({ active }: { active?: boolean }) {
  return (
    <ul className='flex flex-col gap-1'>
      {urls.map(({ id, href, text, icon }) => {
        if (id === 'cart') {
          return (
            <li key={id}>
              <CartLink href={href} icon={icon}>
                {active && text}
              </CartLink>
            </li>
          );
        }
        return (
          <li key={id}>
            <NavLink href={href} icon={icon}>
              {active && text}
            </NavLink>
          </li>
        );
      })}
      <SignOutButton active={active} />
    </ul>
  );
}
export default NavLinks;
