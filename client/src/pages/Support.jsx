import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Support.css';
const Support = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: '50px',
        alignItems: 'center',
      }}
    >
      <Navbar></Navbar>
      <h1>Contact us</h1>
      <div
        style={{
          margin: '4rem',
          textAlign: 'center',
          fontSize: '1.2rem',
          backgroundColor: 'black',
          borderRadius: '2rem',
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          height: '40vh',
          width: '30vw',
          alignContent: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <span className="location" style={{ alignContent: 'center' }}>
          <FontAwesomeIcon icon="fa-solid fa-location-dot" />
          <p>123, Anywhere, St., any city, ST 12345</p>
        </span>
        <hr
          style={{
            width: '100%',
            height: '3px',
            backgroundColor: 'white',
            borderRadius: '50px',
            textAlign: 'center',
          }}
        />
        <span className="phone" style={{ alignContent: 'center' }}>
          <FontAwesomeIcon icon="fa-solid fa-phone" />
          <p>123-456-789</p>
        </span>
        <hr
          style={{
            width: '100%',
            height: '3px',
            backgroundColor: 'white',
            borderRadius: '50px',
            textAlign: 'center',
          }}
        />
        <span className="email" style={{ alignContent: 'center' }}>
          <FontAwesomeIcon icon="fa-solid fa-envelope" />
          <p>random@dinolingo.com</p>
        </span>
      </div>
    </div>
  );
};
export default Support;
