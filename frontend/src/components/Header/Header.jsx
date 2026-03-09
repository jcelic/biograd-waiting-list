import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './Header.module.css';
import { useAppStore } from '../../store/useAppStore';

const Header = () => {
  const { setMobNavOpen } = useAppStore();

  return (
    <header className={styles.header}>
      <h1>Liste narudžbi Specijalne bolnice za ortopediju Biograd na Moru</h1>
      <button onClick={() => setMobNavOpen(true)}>
        <RxHamburgerMenu />
      </button>
    </header>
  );
};

export default Header;
