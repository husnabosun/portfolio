import { useEffect, useState } from 'react';
import Icon from '../components/Icon.jsx';
import '../App.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const sectionIds = ['about', 'skills', 'experience', 'education', 'projects', 'contact'];
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));

    const markContactAtPageEnd = () => {
      const isAtPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (isAtPageEnd) setActiveSection('contact');
    };

    window.addEventListener('scroll', markContactAtPageEnd, { passive: true });
    markContactAtPageEnd();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', markContactAtPageEnd);
    };
  }, []);

  return (
      <header className="header-sticky">
        <nav className="nav container" aria-label="Main navigation">
          <a className="brand" href="#top" onClick={closeMenu}>
            Hüsna Bosun
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={19} />
          </button>

          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a className={activeSection === 'about' ? 'is-active' : ''} href="#about" onClick={closeMenu}>About Me</a>
            <a className={activeSection === 'skills' ? 'is-active' : ''} href="#skills" onClick={closeMenu}>Skills</a>
            <a className={activeSection === 'experience' ? 'is-active' : ''} href="#experience" onClick={closeMenu}>Experience</a>
            <a className={activeSection === 'education' ? 'is-active' : ''} href="#education" onClick={closeMenu}>Education</a>
            <a className={activeSection === 'projects' ? 'is-active' : ''} href="#projects" onClick={closeMenu}>Projects</a>
            <a className={activeSection === 'contact' ? 'is-active' : ''} href="#contact" onClick={closeMenu}>Contact Me</a>

            <a className="resume-button" href="/files/resume.pdf" target="_blank" rel="noreferrer" onClick={closeMenu}>
              Resume <Icon name="download" size={13} />
            </a>
          </div>
        </nav>
      </header>

  );
}
export default Header;