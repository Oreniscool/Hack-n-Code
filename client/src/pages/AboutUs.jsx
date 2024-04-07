import Navbar from '../components/Navbar';

const AboutUs = () => {
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
      <h1>About us</h1>
      <p style={{ margin: '4rem', textAlign: 'center', fontSize: '1.2rem' }}>
        Welcome to DinoLingo, your ultimate destination for mastering real-world
        languages!
        <br />
        <br /> At DinoLingo, we believe that language learning should be
        engaging, immersive, and most importantly, fun! Whether you're a
        beginner or striving to perfect your skills, our platform offers a
        dynamic array of tools and resources to help you achieve fluency. Embark
        on your language learning journey with our interactive games, including
        our unique spin on classics like Wordle, designed to challenge and
        enhance your vocabulary.
        <br />
        <br /> Engage in lively discussions and practice sessions with fellow
        learners from around the globe in our vibrant chat community. Our daily
        modules provide structured lessons tailored to your proficiency level,
        ensuring steady progress and consistent improvement. <br />
        <br />
        From grammar drills to cultural insights, we cover all aspects of
        language acquisition to empower you with the skills you need to thrive
        in real-world situations. Join us at DinoLingo and unlock the doors to a
        world of linguistic possibilities. Let's embark on this exciting
        adventure together!
      </p>
    </div>
  );
};
export default AboutUs;
