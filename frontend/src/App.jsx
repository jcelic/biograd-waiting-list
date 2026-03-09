import Header from './components/Header/Header';
import Info from './components/Info/Info';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <Navbar />
      <Info />
    </div>
  );
};

export default App;
