import Header from './components/Header';
import Hero from './components/Hero';
import ScrollVelocity from './components/ScrollVelocity';
import ProjectsGrid from './components/ProjectsGrid';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  return (
    <>
      {/* Premium custom mouse cursor */}
      <CustomCursor />

      {/* Main Page Layout */}
      <Header />
      
      <main>
        {/* Animated Hero section */}
        <Hero />

        {/* Dynamic scroll-velocity text marquee banner */}
        <ScrollVelocity />

        {/* Dynamic filterable Projects Grid */}
        <ProjectsGrid />

        {/* Contact Info and form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
