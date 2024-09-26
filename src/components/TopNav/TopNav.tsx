import { useState } from 'react';

import styles from './TopNav.module.css';

type TopNavProps = {
  links: { name: string; href: string }[];
  isOpen?: boolean;
  toggleMenu?: () => void;
};

const TopNav: React.FC<TopNavProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>My-Logo</div>
      <button type="button" className={styles.menuIcon} onClick={toggleMenu}>
        <div className={styles.bar}>-</div>
        <div className={styles.bar}>-</div>
        <div className={styles.bar}>-</div>
      </button>
      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        {links.map(link => (
          <li key={link.name}>
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNav;
