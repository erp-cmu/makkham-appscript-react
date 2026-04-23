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
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentNav('home');
              }}
            >
              หน้าแรก
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              className={styles.navLink}
              href="#"
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
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentNav('bnn_pass_1');
              }}
            >
              การคัดแยก 1
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              className={styles.navLink}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentNav('bnn_pass_2');
              }}
            >
              การคัดแยก 2
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              className={styles.navLink}
              href="#"
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
