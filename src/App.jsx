import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import AboutUs from './components/AboutUs';
import Team from './components/Team';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <AboutUs />
        <Team />
        <Events />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}

export default App;
