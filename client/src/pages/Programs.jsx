/* eslint-disable react/prop-types */
import '../styles/Programs.css';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import programInfo from '../data/programInfo';
import { useEffect } from 'react';

const Programs = () => {
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
      <h1>{`it's easy to Get Started`}</h1>
      <div
        className="programs"
        style={{
          display: 'flex',
          width: '80vw',
          justifyContent: 'space-between',
          alignContent: 'center',
          marginTop: '40px',
        }}
      >
        {programInfo.map((program) => (
          <Program key={program.id} {...program}></Program>
        ))}
      </div>
    </div>
  );
};

const Program = ({ name, period, features, status }) => {
  const [classList, setClassList] = useState(['card']);
  useEffect(() => {
    if (status) {
      setClassList(['card', 'special']);
    }
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     let cards = Array.from(document.querySelectorAll('.card'));
  //     cards.forEach((card) => {
  //       card.style.display = 'flex';
  //       card.style.transform = 'translate(0,0)';
  //     });
  //   }, 2000);
  // });

  return (
    <div className={name + ' ' + classList.join(' ')}>
      <h2>{name.toUpperCase()}</h2>
      <h5>
        {period} <span style={{ color: 'gray', fontWeight: 300 }}>months</span>
      </h5>
      <hr style={{ color: 'gray', width: '80%' }} />
      <div className="features">
        {features.map((feature, index) => (
          <p key={index} style={{ fontSize: '12px' }}>
            ✔️ <span>{feature}</span>
          </p>
        ))}
      </div>
    </div>
  );
};
export default Programs;
