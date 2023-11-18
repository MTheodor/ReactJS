import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../features';

import styles from './Nav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export function Nav() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  function logOut(e) {
    e.preventDefault();
    logout();
    navigate('/');
  }

  return (
    <nav className={styles['main-menu']}>
      <ul>
        {/* For seeing the games */}
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to="/"
          >
            <FontAwesomeIcon icon={solid('home')} />
          </NavLink>
        </li>

        {user && (
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/favorites"
            >
              <FontAwesomeIcon icon={solid('star')} />
            </NavLink>
          </li>
        )}

        {/* For profile */}
        {user && (
          <li className={styles['push-right']}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={`/profile/${user.id}`}
            >
              <FontAwesomeIcon
                className={styles['adjust']}
                icon={solid('address-card')}
              />
            </NavLink>{' '}
            <button onClick={logOut}>
              <FontAwesomeIcon icon={solid('door-open')} />
            </button>
          </li>
        )}

        {!user && (
          <>
            <li className={styles['push-right']}>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : '')}
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : '')}
                to="/register"
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
