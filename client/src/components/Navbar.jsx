import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '30px',
        alignItems: 'center',
        width: '90%',
      }}
    >
      <h1 className="dinolingo-name">Dinolingo</h1>
      <div className="navbar-options">
        <Link to="/" className="option">
          Home
        </Link>
        <Link to="/support" className="option">
          Support
        </Link>
        <Link to="/about" className="option">
          About us
        </Link>
        <Link to="/programs" className="option">
          Programs
        </Link>
        <Link to="/login" className="get-started">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
