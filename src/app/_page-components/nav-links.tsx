import NavLink from './nav-link';
import SignOutButton from './nav-link/sign-out-button';
import urls from './urls-data';

function NavLinks() {
  return (
    <ul className='flex flex-col gap-1'>
      {urls.map(({ id, href, text, icon }) => (
        <li key={id}>
          <NavLink href={href} icon={icon}>
            {text}
          </NavLink>
        </li>
      ))}
      <SignOutButton />
    </ul>
  );
}
export default NavLinks;
