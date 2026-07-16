import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import MouseGlow from './components/MouseGlow';
import ScrollToTopFab from './components/ScrollToTopFab';
import LazyLoadSection from './components/LazyLoadSection';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const ProjectsList = lazy(() => import('./pages/ProjectsList'));
const Contact = lazy(() => import('./components/Contact'));
const Skills = lazy(() => import('./components/Skills'));
const Resources = lazy(() => import('./pages/resources/index.jsx'));
const ResourceDetail = lazy(() => import('./pages/resources/detail.jsx'));
const SkillDetail = lazy(() => import('./pages/SkillDetail'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ResourcePreview = lazy(() => import('./components/ResourcePreview'));
const TzXyz = lazy(() => import('./pages/TzXyz'));
const TzResources = lazy(() => import('./pages/TzResources'));
const Tz2019Card = lazy(() => import('./pages/2019Card'));
const XiGua = lazy(() => import('./pages/XiGua'));
const HardwareDetector = lazy(() => import('./pages/HardwareDetector'));

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
      <Suspense fallback={<div className="min-h-screen" />}>
        <Hero />
      </Suspense>
      <LazyLoadSection rootMargin="200px">
        <Suspense fallback={<div className="h-80 bg-gradient-to-r from-slate-200/30 via-slate-100/30 to-slate-200/30 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-slate-800/30 rounded-xl animate-pulse" />}>
          <ResourcePreview />
        </Suspense>
      </LazyLoadSection>
      <LazyLoadSection rootMargin="200px">
        <Suspense fallback={<div className="h-80 bg-gradient-to-r from-slate-200/30 via-slate-100/30 to-slate-200/30 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-slate-800/30 rounded-xl animate-pulse" />}>
          <About />
        </Suspense>
      </LazyLoadSection>
      <LazyLoadSection rootMargin="200px">
        <Suspense fallback={<div className="h-96 bg-gradient-to-r from-slate-200/30 via-slate-100/30 to-slate-200/30 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-slate-800/30 rounded-xl animate-pulse" />}>
          <Skills />
        </Suspense>
      </LazyLoadSection>
      <LazyLoadSection rootMargin="200px">
        <Suspense fallback={<div className="h-96 bg-gradient-to-r from-slate-200/30 via-slate-100/30 to-slate-200/30 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-slate-800/30 rounded-xl animate-pulse" />}>
          <Projects />
        </Suspense>
      </LazyLoadSection>
      <LazyLoadSection rootMargin="200px">
        <Suspense fallback={<div className="h-80 bg-gradient-to-r from-slate-200/30 via-slate-100/30 to-slate-200/30 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-slate-800/30 rounded-xl animate-pulse" />}>
          <Contact />
        </Suspense>
      </LazyLoadSection>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/20 transition-colors duration-300">
          <ParticleBackground />
          <MouseGlow />
          <Navbar />
          <main className="relative z-10">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/:resourceId" element={<ResourceDetail />} />
                <Route path="/skills/:skillId" element={<SkillDetail />} />
                <Route path="/projects" element={<ProjectsList />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
                <Route path="/tz" element={<TzXyz />} />
                <Route path="/tz-resources" element={<TzResources />} />
                <Route path="/2019-card" element={<Tz2019Card />} />
                <Route path="/xigua" element={<XiGua />} />
                <Route path="/hardware-detector" element={<HardwareDetector />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ScrollToTopFab />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
