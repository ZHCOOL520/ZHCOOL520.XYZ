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

/*
 * 动画保底（fail-safe）。
 * 全站的进场动画都靠 ScrollTrigger 触发，元素先被 gsap.set 成 autoAlpha:0（visibility:hidden）。
 * 万一某个触发器没被创建或没触发（视口太矮、懒加载刚挂载、插件异常），那块内容会一直不可见。
 * 这里在每次路由挂载 2.5 秒后兜底一次：只把「当前在视口内、且仍被内联样式隐藏」的元素显示出来。
 * 它只会让内容出现，不会隐藏任何东西，也不会打扰已经播完的动画。
 */
function AnimationFailsafe() {
  const { pathname } = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => {
      const hidden = document.querySelectorAll('[style*="visibility: hidden"], [style*="visibility:hidden"]');
      hidden.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [pathname]);
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
        <AnimationFailsafe />
        <div className="relative min-h-screen page-backdrop transition-colors duration-300">
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
