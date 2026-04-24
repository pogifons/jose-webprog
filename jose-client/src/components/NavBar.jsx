import { NavLink } from 'react-router-dom';
import logo from '../assets/styles/pictures/petpals.png';
import Button from './Button';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'pet-navlink',
    isActive
      ? 'pet-navlink-active'
      : 'pet-navlink-idle',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="pet-nav">
      <div className="pet-container flex items-center justify-between gap-4 py-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="PetPals"
            className="h-9 w-auto object-contain sm:h-10"
            loading="eager"
            decoding="async"
          />
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
          <Button to="/auth/signin" variant="secondary" className="ml-2">
            Sign in
          </Button>
        </nav>

        <details className="relative md:hidden">
          <summary className="pet-button pet-button-secondary list-none select-none">
            Menu
          </summary>
          <div
            className="absolute right-0 mt-3 w-56 rounded-3xl border-2 p-2 shadow-[var(--pet-shadow)]"
            style={{ borderColor: 'var(--pet-border)', background: 'rgba(255,250,242,0.96)' }}
          >
            <nav className="flex flex-col gap-2 p-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={navLinkClassName}
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/auth/signin" className={navLinkClassName}>
                Sign in
              </NavLink>
              <NavLink to="/auth/signup" className={navLinkClassName}>
                Sign up
              </NavLink>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
};

export default NavBar;