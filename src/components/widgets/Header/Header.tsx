import styles from './Header.module.scss';
import Logo from '@/app/assets/icons/Logo.svg?react';
import ProfileIcon from '@/app/assets/icons/Profile.svg?react';

import { NavLink } from "react-router-dom";


export const Header = () => {

  return (
    <header className={styles.header}>
      <NavLink to={'/'}>
        <Logo className={styles.header__logo} />
      </NavLink>

      <nav className={styles.header__nav}>
        <NavLink to={'/'} className={({ isActive }) =>
          isActive ? [styles.header__navItemLink, styles.header__navItemLink_active].join(' ') : styles.header__navItemLink
        }>
          Home
        </NavLink>
        <NavLink to={'/orders'} className={({ isActive }) =>
          isActive ? [styles.header__navItemLink, styles.header__navItemLink_active].join(' ') : styles.header__navItemLink
        }>
          Orders
        </NavLink>
      </nav>

      <NavLink to={'/auth'}>
        <ProfileIcon className={styles.header__profile} />
      </NavLink>
    </header>
  )
}

