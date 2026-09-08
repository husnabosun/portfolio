import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Icon from './components/Icon.jsx';
import Skills from './sections/Skills.jsx';
import Experiences from './sections/Experiences.jsx';
import Education from './sections/Education.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';
import Hero from './sections/Hero.jsx';
import formatExperienceDate from './utils.js';
import { skills, socialLinks } from './constants.js';
import API_URL from './config/api.js';



function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [about, setAbout] = useState({ name: '', title: '', bio: '', location: '' });
  const [aboutLoading, setAboutLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Projects fetch error:', err))
      .finally(() => setProjectsLoading(false));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/experiences`)
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error('Experiences fetch error:', err));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/about`)
      .then((res) => res.json())
      .then((data) => setAbout(data))
      .catch((err) => console.error('About fetch error:', err))
      .finally(() => setAboutLoading(false));
  }, []);

  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (!revealEls.length) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    // Track which elements have already received an observer callback so we only
    // skip the "page load" animation for sections that were visible on the very
    // first (async, layout-settled) measurement instead of a synchronous check.
    const seen = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const isFirstCallback = !seen.has(el);
          seen.add(el);

          if (!entry.isIntersecting) return;

          if (isFirstCallback) {
            el.classList.add('is-visible', 'reveal-instant');
          } else {
            el.classList.add('is-visible');
          }
          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <Header closeMenu={closeMenu} />
      <Hero about={about} aboutLoading={aboutLoading} socialLinks={socialLinks} Icon={Icon} />
      <Skills skills={skills} />
      <Education />
      <Experiences experiences={experiences} formatExperienceDate={formatExperienceDate} />
      <Projects projects={projects} projectsLoading={projectsLoading} />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;