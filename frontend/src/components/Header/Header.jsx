import styles from './Header.module.css';
import { TextAlignJustify } from 'lucide-react';

const Header = ({ setNavOpen }) => {
  return (
    <header className={styles.header}>
      <h1>Liste narudžbi Specijalne bolnice za ortopediju Biograd na Moru</h1>
      <button
        type="button"
        onClick={() => {
          setNavOpen(true);
        }}
      >
        <TextAlignJustify size={32} />
      </button>
    </header>
  );
};

export default Header;
