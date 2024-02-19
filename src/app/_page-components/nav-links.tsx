import NavLink from './nav-link';
import SignOutButton from './nav-link/sign-out-button';
import urls from './urls-data';

function NavLinks({ active }: { active?: boolean }) {
  return (
    <ul className='flex flex-col gap-1'>
      {urls.map(({ id, href, text, icon }) => (
        <li key={id}>
          <NavLink href={href} icon={icon}>
            {active && text}
          </NavLink>
        </li>
      ))}
      <SignOutButton active={active} />
    </ul>
  );
}
export default NavLinks;
