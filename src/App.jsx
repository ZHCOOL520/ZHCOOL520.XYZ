import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Resources from './pages/Resources';
import SkillDetail from './pages/SkillDetail';
import ProjectDetail from './pages/ProjectDetail';
import ResourcePreview from './components/ResourcePreview';
import TzXyz from './pages/TzXyz';
import TzResources from './pages/TzResources';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <ResourcePreview />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-light-100 dark:bg-dark-900 transition-colors duration-300">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/skills/:skillId" element={<SkillDetail />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/tz" element={<TzXyz />} />
            <Route path="/tz-resources" element={<TzResources />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
