import styles from './Navbar.module.css';
import { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { TfiClose } from 'react-icons/tfi';

const Navbar = () => {
  const {
    fetchProcedures,
    procedures,
    setCurrentProcedure,
    currentProcedure,
    setSearchValue,
    mobNavOpen,
    setMobNavOpen,
  } = useAppStore();

  useEffect(() => {
    fetchProcedures();
  }, [fetchProcedures]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 940px)');

    const handleScreenSizeChange = e => {
      if (e.matches) {
        setMobNavOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleScreenSizeChange);
    return () => {
      mediaQuery.removeEventListener('change', handleScreenSizeChange);
    };
  }, [setMobNavOpen]);

  return (
    <nav
      className={`${styles.navbar} ${mobNavOpen ? styles['openMobNav'] : ''}`}
    >
      <span className={styles.closeBtn} onClick={() => setMobNavOpen(false)}>
        <TfiClose />
      </span>
      <ul>
        {procedures.map(procedure => (
          <li
            className={
              procedure.postupci_id === currentProcedure.postupci_id
                ? `${styles.active}`
                : ''
            }
            onClick={() => {
              setCurrentProcedure(procedure);
              setSearchValue('');
              mobNavOpen && setMobNavOpen(false);
            }}
            key={procedure.postupci_id}
          >
            {procedure.naziv_postupka}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
