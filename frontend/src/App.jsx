import { useState, useEffect, useRef } from 'react';
import './App.css';

const skills = [
  { name: 'Git', mark: '◆', tone: 'light' },
  { name: 'Javascript', mark: 'JS', tone: 'dark' },
  { name: 'Nest.Js', mark: '✦', tone: 'light' },
  { name: 'React', mark: '⚛', tone: 'light' },
  { name: 'TypeScript', mark: 'TS', tone: 'dark' },
  { name: 'Next.Js', mark: 'N', tone: 'dark' },
];

const Icon = ({ name, size = 16 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (name) {
    case 'github':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
        </svg>
      );

    case 'linkedin':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      );

    case 'twitter':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );

    case 'mail':
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );

    case 'menu':
      return (
        <svg {...common}>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      );

    case 'close':
      return (
        <svg {...common}>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      );

    case 'download':
      return (
        <svg {...common}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      );

    case 'arrow':
      return (
        <svg {...common}>
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      );

    default:
      return null;
  }
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/husnabosun', icon: 'github' },
  { label: 'LinkedIn', href: 'www.linkedin.com/in/husnabosun', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:bosunhusna@gmail.com', icon: 'mail' },
];

const SKILLS_SPEED_PX_PER_FRAME = 0.5;

const SkillsMarquee = ({ skills: items }) => {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const hoveringRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const doubledItems = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };
    measure();

    let rafId;

    const applyTransform = () => {
      const loopWidth = loopWidthRef.current;
      if (loopWidth > 0) {
        let normalized = offsetRef.current % loopWidth;
        if (normalized < 0) normalized += loopWidth;
        offsetRef.current = normalized;
      }
      track.style.transform = `translateX(${-offsetRef.current}px)`;
    };

    const tick = () => {
      if (!draggingRef.current && !hoveringRef.current && !reducedMotionRef.current) {
        offsetRef.current += SKILLS_SPEED_PX_PER_FRAME;
      }
      applyTransform();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const handleResize = () => measure();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePointerDown = (event) => {
    draggingRef.current = true;
    pointerStartXRef.current = event.clientX;
    startOffsetRef.current = offsetRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add('is-dragging');
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;
    const delta = event.clientX - pointerStartXRef.current;
    offsetRef.current = startOffsetRef.current - delta;
  };

  const endDrag = (event) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.classList.remove('is-dragging');
  };

  return (
    <div
      className="skills-marquee"
      onMouseEnter={() => {
        hoveringRef.current = true;
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
      }}
    >
      <div
        className="skills-track"
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {doubledItems.map((skill, index) => (
          <div
            className={`skill-card ${skill.tone}`}
            key={`${skill.name}-${index}`}
          >
            <span className="skill-mark">{skill.mark}</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatExperienceDate = (value) => {
  if (!value) return 'Present';
  if (typeof value === 'string' && value.toLowerCase() === 'present') return 'Present';

  const date = new Date(`${String(value)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [about, setAbout] = useState({ name: '', title: '', bio: '', location: '' });

  useEffect(() => {
    fetch('http://localhost:3001/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Projects fetch error:', err))
      .finally(() => setProjectsLoading(false));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/experiences')
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error('Experiences fetch error:', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/about')
      .then((res) => res.json())
      .then((data) => setAbout(data))
      .catch((err) => console.error('About fetch error:', err));
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
      <header className="header-sticky">
        <nav className="nav container" aria-label="Main navigation">
          <a className="brand" href="#top" onClick={closeMenu}>
            <span className="brand-mark">P</span>
            <span>Personal</span>
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
            <a href="#about" onClick={closeMenu}>About Me</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#contact" onClick={closeMenu}>Contact Me</a>

            <a className="resume-button" href="#contact" onClick={closeMenu}>
              Resume <Icon name="download" size={13} />
            </a>
          </div>
        </nav>
      </header>

      {/* HERO - FULL WIDTH */}
      <section className="hero reveal" id="top">
        <div className="container hero-inner">
          <div className="hero-copy" id="about">
            <p className="eyebrow">Hello, I&apos;m</p>
            
              <h1 key={about.name}>
                <strong className="hero-name">{about.name.split(' ')[0]}</strong>{' '}
                <strong className="hero-name">{about.name.split(' ')[1]}</strong>
              <br />
              <span>{about.title}</span>
                <br />
                Based in <strong>{about.location}</strong>
              </h1>
            


            <p className="intro">
              QA olarak internship yapıyorum, aynı zamanda backend development
              ve test otomasyonu üzerine kendimi geliştiriyorum.
            </p>

            <div className="social-row" aria-label="Social links">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="social-link"
                >
                  <Icon name={icon} size={15} />
                </a>
              ))}
            </div>
          </div>

          <div
            className="hero-art"
            aria-label="Illustration of a developer working on a laptop"
          >
            <div className="art-halo" />
            <div className="person-head" />
            <div className="person-hair" />
            <div className="person-body" />

            <div className="laptop">
              <div className="laptop-screen">
                <span />
              </div>
              <div className="laptop-base" />
            </div>

            <div className="person-knee knee-left" />
            <div className="person-knee knee-right" />
          </div>
        </div>
      </section>

      <section className="skills-section reveal" id="skills">
        <div className="container">
          <div className="section-heading">
            <span>My</span> Skills
          </div>

          <SkillsMarquee skills={skills} />
        </div>
      </section>

      <section className="experience-section reveal" id="experience">
        <div className="container">
          <div className="section-heading light-heading">
            My <span>Experience</span>
          </div>

          <div className="experience-list">
            {experiences.map((exp) => (
              <article className="experience-card featured-experience reveal-item" key={exp.id}>
                <div className="company-logo">
                  {exp.logo_url ? (
                    <a
                      href={exp.company_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${exp.company}`}
                    >
                      <img src={exp.logo_url} alt={`${exp.company} logo`} />
                    </a>
                  ) : (
                    exp.company?.charAt(0)
                  )}
                </div>

                <div className="experience-content">
                  <div className="experience-title-row">
                    <div className="experience-role-company">
                      <h3>{exp.company}</h3>
                      <h3>{exp.role}</h3>                
                    </div>
                    <span>
                      {formatExperienceDate(exp.start_date)} - {formatExperienceDate(exp.end_date)}
                    </span>
                  </div>

                  <p>
                    {exp.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-section reveal" id="projects">
        <div className="container">
          <div className="projects-heading-row">
            <div className="section-heading projects-heading">
              My <span>Projects</span>
            </div>

            <span className="projects-rule" />
          </div>

          <div className="projects-grid">
            {projectsLoading ? (
              <div className="projects-loading" role="status" aria-label="Loading projects">
                <span className="loading-spinner" />
                <div className="project-skeleton" />
                <div className="project-skeleton" />
                <div className="project-skeleton" />
              </div>
            ) : projects.map((project, index) => (
              <article className="project-card reveal-item" key={project.url || index}>
                <div className="project-number">{
                  String(index + 1).padStart(2, '0')
                }</div>

                <div className="project-card-content">
                  <h3>{project.name}</h3>

                  <p>{project.note || project.description || 'No description available.'}</p>

                  <div className="project-tags">
                    {project.language && <span>{project.language}</span>}
                    {project.stars > 0 && <span>⭐ {project.stars}</span>}
                    {project.featured && <span>Featured</span>}
                  </div>
                </div>

                <a
                  className="project-link"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Learn more about ${project.name}`}
                >
                  <Icon name="arrow" size={18} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - FULL WIDTH */}
      <section className="contact-section reveal" id="contact">
        <div className="container contact-inner">
          <div>
            <p className="eyebrow">Have a project in mind?</p>

            <h2>
              Let&apos;s build something <span>great.</span>
            </h2>
          </div>

          <a
            className="contact-button"
            href="mailto:bosunhusna@gmail.com"
          >
            Get in touch <Icon name="arrow" size={17} />
          </a>
        </div>
      </section>

      {/* FOOTER - FULL WIDTH */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2026 Hüsna Bosun</span>
          <span>Designed with hüpüs.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;