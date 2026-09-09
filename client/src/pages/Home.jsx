import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import AboutUs from '../components/AboutUs';
import Team from '../components/Team';
import Events from '../components/Events';
import Gallery from '../components/Gallery';

const Home = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <AboutUs />
      <Team />
      <Events />
      <Gallery />
    </main>
  );
};

export default Home;
