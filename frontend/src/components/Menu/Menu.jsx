import styles from './Menu.module.css';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProcedures } from '../../api/procedures';

const Menu = ({
  setSelectedProcedureId,
  selectedProcedureId,
  navOpen,
  setNavOpen,
  isResizing,
}) => {
  const {
    isLoading,
    isError,
    data: procedures = [],
  } = useQuery({
    queryKey: ['procedures'],
    queryFn: getProcedures,
  });

  useEffect(() => {
    if (!selectedProcedureId) {
      setSelectedProcedureId(procedures?.[0]?.id);
    }
  }, [procedures, selectedProcedureId, setSelectedProcedureId]);

  const handleProcedureClick = (procedure) => {
    setSelectedProcedureId(procedure.id);
    setNavOpen(false);
  };

  return (
    <nav
      className={`
    ${styles.navbar}
    ${navOpen ? styles.openMobNav : ''}
    ${isResizing ? styles.noTransition : ''}
  `}
    >
      <span className={styles.closeBtn} onClick={() => setNavOpen(false)}>
        <X size={32} />
      </span>

      {isError ? (
        <p>Greška pri dohvaćanju postupaka.</p>
      ) : (
        <ul>
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <li key={index} className={styles.skeletonItem}></li>
              ))
            : procedures.map((procedure) => (
                <li
                  className={
                    procedure.id === selectedProcedureId ? styles.active : ''
                  }
                  onClick={() => handleProcedureClick(procedure)}
                  key={procedure.id}
                >
                  {procedure.name}
                </li>
              ))}
        </ul>
      )}
    </nav>
  );
};

export default Menu;
