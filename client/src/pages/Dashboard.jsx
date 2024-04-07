import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import dashboardOptions from '../data/dashboardOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('auth')) || ''
  );
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const fetchLuckyNumber = async () => {
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/dashboard',
        axiosConfig
      );
      setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchLuckyNumber();
    if (token === '') {
      navigate('/login');
      toast.warn('Please login first to access dashboard');
    }
  }, [token]);

  return (
    <div className="dashboard-main">
      <Sidebar></Sidebar>
      <div
        style={{
          padding: '2.5rem',
          height: '100%',
          width: '85vw',
          position: 'absolute',
          top: '0px',
          right: '0px',
        }}
      >
        <Topbar></Topbar>
      </div>
      <Content></Content>
      {/* <Link to="/logout" className="logout-button">
        Logout
      </Link> */}
    </div>
  );
};

const Content = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '3rem',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Skills></Skills>
      <RightBar></RightBar>
    </div>
  );
};
const CourseInfo = () => {
  return (
    <div className="course-info" style={{ fontSize: '1rem' }}>
      Your course is, <span style={{ fontSize: '1.5rem' }}>intermediate</span>
    </div>
  );
};
const LessonCount = () => {
  return (
    <div className="lesson-count" style={{ fontSize: '1.1rem' }}>
      20/<span style={{ color: '#cbaed8' }}>60</span> lessons passed
    </div>
  );
};
const Modules = () => {
  return (
    <div className="modules" style={{ fontSize: '1.1rem' }}>
      5/<span style={{ color: '#cbaed8' }}>15</span> modules
    </div>
  );
};
const Skills = () => {
  return (
    <div
      className="skills"
      style={{ color: '#a362fe', width: '50vw', marginLeft: '5rem' }}
    >
      <h4>Your Skills</h4>
      <Skill name={'Vocabulary'} progress={77}></Skill>
      <Skill name={'Grammar'} progress={80}></Skill>
      <Skill name={'Listening'} progress={72}></Skill>
      <Skill name={'Reading'} progress={63}></Skill>
      <Skill name={'Speaking'} progress={50}></Skill>
    </div>
  );
};
const RightBar = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '17rem',
      }}
    >
      <CourseInfo></CourseInfo>
      <LessonCount></LessonCount>
      <Modules></Modules>
    </div>
  );
};
const Skill = ({ name, progress }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '10px',
      }}
    >
      <p style={{ textAlign: 'right' }}>{name}</p>
      <div
        style={{
          backgroundColor: '#d9d9d9',
          height: '10px',
          width: '80%',
          textAlign: 'right',
          borderRadius: '30px',
        }}
      >
        <div
          style={{
            backgroundColor: '#cf710e',
            color: 'white',
            padding: '1%',
            textAlign: 'right',
            fontSize: '20px',
            width: `${progress}%`,
            borderRadius: '30px',
          }}
        ></div>
      </div>
      <p>{progress}%</p>
    </div>
  );
};
const Topbar = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const toggleLogout = (e) => {
    if (!e.target.lastElementChild) {
      e.target = e.target.parentElement;
    }
    e.target.lastElementChild.classList.toggle('display');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignContent: 'center',
      }}
    >
      <p className="greeting" style={{ fontSize: '2.2rem' }}>
        Hello, <span style={{ color: '#cf710e' }}>Oren</span>
        <br />
        <span
          style={{ fontSize: '1.2rem', color: '#c5a9d6' }}
        >{`Let's continue`}</span>
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative',
        }}
      >
        <button type="button" className="profile" onClick={toggleLogout}>
          <FontAwesomeIcon icon="fa-solid fa-user" />
          <p style={{ fontSize: '1.1rem' }}>Oren Coelho</p>
          <Link
            to="/logout"
            className="logout"
            style={{
              position: 'absolute',
              transform: 'translateY(120%) translateX(50%)',
            }}
          >
            Logout
          </Link>
        </button>
        <div className="date">
          <FontAwesomeIcon icon="fa-regular fa-calendar" />
          <p>{currentDate}</p>
        </div>
      </div>
    </div>
  );
};
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 style={{ color: '#cf710e' }}>Dinolingo</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '60%',
          justifyContent: 'space-between',
        }}
      >
        {dashboardOptions.map((option) => (
          <Link
            key={option.id}
            to={option.link}
            className="dashboard-option"
            style={{
              display: 'flex',
              fontSize: '1.2rem',
              alignItems: 'center',
              justifyContents: 'space-evenly',
            }}
          >
            <FontAwesomeIcon icon={option.icon} />
            <p>{option.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${month}/${date}`;
}

export default Dashboard;
