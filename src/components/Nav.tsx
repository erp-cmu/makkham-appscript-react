import { atom, useAtom } from 'jotai';

import styles from '../styles/nav.module.css';

export const navAtom = atom('home');

function Nav() {
  const [currentNav, setCurrentNav] = useAtom(navAtom);

  return (
    <header>
      <nav className={styles.mainNav}>
        <span className={styles.navCompany}>Makkham</span>
        <ul className={styles.navWrapper}>
          <li className={styles.navItem}>
            <a
              className={styles.navLink}
              href="#home"
              aria-current={currentNav === 'home' ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                setCurrentNav('home');
              }}
            >
              Home
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              className={styles.navLink}
              href="#bnn_dried"
              aria-current={currentNav === 'bnn_dried' ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                setCurrentNav('bnn_dried');
              }}
            >
              การตากแห้ง
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              className={styles.navLink}
              href="#packing"
              aria-current={currentNav === 'packing' ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                setCurrentNav('packing');
              }}
            >
              การบรรจุภัณฑ์
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
