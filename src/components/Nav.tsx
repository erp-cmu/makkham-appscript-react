import { atom, useAtom } from 'jotai';

export const navAtom = atom('home');

function Nav() {
  const [currentNav, setCurrentNav] = useAtom(navAtom);

  return (
    <header className="app-topbar">
      <nav className="main-nav" aria-label="Main navigation">
        <div className="main-nav-brand">
          <span className="main-nav-company">Makkham</span>
          <span className="main-nav-tagline">Dashboard</span>
        </div>
        <ul className="main-nav-list">
          <li>
            <a
              href="#home"
              className="main-nav-link"
              aria-current={currentNav === 'home' ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                setCurrentNav('home');
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#packing"
              className="main-nav-link"
              aria-current={currentNav === 'packing' ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                setCurrentNav('packing');
              }}
            >
              Packing
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
