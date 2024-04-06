import '../styles/Home.css';
import people from '../assets/people.png';
import translate from '../assets/translation.png';
import { Link } from 'react-router-dom';
const Home = () => {
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
      <Board></Board>
    </div>
  );
};
const Board = () => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        width: '90vw',
        height: '80vh',
        borderRadius: '1rem',
        display: 'grid',
        gridTemplateRows: 'repeat(3,1fr)',
        gridTemplateColumns: 'repeat(3,1fr)',
        padding: '30px',
      }}
    >
      <h1
        style={{
          color: 'white',
          fontWeight: '200',
          gridColumn: '1/3',
          fontSize: '3rem',
        }}
      >
        Become a language Ninja with{' '}
        <span style={{ fontWeight: '600' }}>Dinolingo</span>
      </h1>
      <div
        style={{
          gridRow: '1/4',
          gridColumn: '3/4',
          backgroundColor: '#1a1a1a',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          borderRadius: '1.5rem',
          flexDirection: 'column',
        }}
      >
        <img src={people} alt="people" style={{ width: '85%' }} />
        <hr style={{ backgroundColor: 'gray', width: '85%' }} />
        <div
          className="people-button"
          style={{
            width: '85%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button
            style={{
              fontSize: '1.3rem',
              border: 'none',
              backgroundColor: '#323232',
              padding: '7px 30px',
              color: 'white',
              borderRadius: '2rem',
            }}
          >
            Explore Worldwide Tutors
          </button>
          <button
            className="right-button"
            style={{
              fontSize: '1.2rem',
              border: 'none',
              color: '#323232',
              padding: '9px 14px ',
              backgroundColor: 'white',
              borderRadius: '2rem',
              textAlign: 'center',
            }}
          >
            {'>'}
          </button>
        </div>
      </div>
      <div
        style={{
          gridColumn: '1/3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}
      >
        <h2
          className="text-cta"
          style={{
            color: 'white',
            fontWeight: '200',
            width: '70%',
          }}
        >
          Interactive lessons, quizzes, and progress tracking to accelerate your
          language learning journey
        </h2>
        <button className="get-fluent">Get Fluent</button>
      </div>
      <Languages />
    </div>
  );
};
const Languages = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '25px',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <img src={translate} alt="translate" style={{ width: '50px' }} />
        <h3 style={{ color: 'white' }}>Choose Language</h3>
      </div>
      <div
        style={{
          display: 'grid',
          gap: '5px',
          gridTemplateColumns: 'repeat(3,1fr)',
          gridTemplateRows: 'repeat(3,1fr)',
        }}
      >
        <button className="lang">English</button>
        <button className="lang">German</button>
        <button className="lang">Latin</button>
        <button className="lang">Spanish</button>
        <button className="lang">Arabic</button>
        <button
          className="lang"
          style={{ backgroundColor: '#d6b4ff', border: 'none' }}
        >
          +50
        </button>
      </div>
    </div>
  );
};
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
        <p className="option">Home</p>
        <p className="option">Programs</p>
        <p className="option">About us</p>
        <p className="option">Support</p>
        <Link to="/login" className="get-started">
          Get started
        </Link>
      </div>
    </div>
  );
};
export default Home;
