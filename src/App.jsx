import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>ZHCOOL520 - 个人主页 | HarmonyOS & Android 开发者</title>
        <meta name="description" content="ZHCOOL520 的个人主页 - HarmonyOS & Android 开发者，Minecraft Mod & Plugin 创作者，热爱开源与技术创新。" />
        <link rel="canonical" href="https://zhcool520.xyz/" />
        <meta property="og:title" content="ZHCOOL520 - 个人主页" />
        <meta property="og:description" content="HarmonyOS & Android 开发者，Minecraft Mod & Plugin 创作者" />
        <meta property="og:url" content="https://zhcool520.xyz/" />
        <meta property="og:image" content="https://zhcool520.xyz/images/fox.webp" />
        <meta name="twitter:title" content="ZHCOOL520 - 个人主页" />
        <meta name="twitter:description" content="HarmonyOS & Android 开发者，Minecraft Mod & Plugin 创作者" />
      </Helmet>
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
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/20 transition-colors duration-300">
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
    </HelmetProvider>
  );
}
