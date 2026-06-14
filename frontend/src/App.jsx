import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Info from './components/Info/Info';

const App = () => {
  const [selectedProcedureId, setSelectedProcedureId] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      setIsResizing(true);

      if (window.innerWidth > 1100) {
        setNavOpen(false);
      }

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsResizing(false);
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="container">
      <div
        className={`overlay ${navOpen ? 'showOverlay' : ''}`}
        onClick={() => setNavOpen(false)}
      ></div>

      <Header setNavOpen={setNavOpen} />
      <Menu
        selectedProcedureId={selectedProcedureId}
        setSelectedProcedureId={setSelectedProcedureId}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        isResizing={isResizing}
      />
      <Info
        key={selectedProcedureId ?? 'empty'}
        selectedProcedureId={selectedProcedureId}
      />
    </div>
  );
};

export default App;
