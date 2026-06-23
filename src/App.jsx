import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Resources from './pages/resources/index.jsx';
import ResourceDetail from './pages/resources/detail.jsx';
import SkillDetail from './pages/SkillDetail';
import ProjectDetail from './pages/ProjectDetail';
import ResourcePreview from './components/ResourcePreview';
import TzXyz from './pages/TzXyz';
import TzResources from './pages/TzResources';
import MouseGlow from './components/MouseGlow';
import ScrollToTopFab from './components/ScrollToTopFab';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
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
        <MouseGlow />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:resourceId" element={<ResourceDetail />} />
            <Route path="/skills/:skillId" element={<SkillDetail />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/tz" element={<TzXyz />} />
            <Route path="/tz-resources" element={<TzResources />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopFab />
      </div>
    </BrowserRouter>
  );
}
