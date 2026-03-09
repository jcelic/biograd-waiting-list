import { PuffLoader } from 'react-spinners';

const Loader = () => {
  const override = {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  };

  return (
    <div>
      <PuffLoader color='#e5e8ea' cssOverride={override} size={150} />
    </div>
  );
};

export default Loader;
