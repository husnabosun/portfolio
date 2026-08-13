import { useState } from 'react';
import './App.css';

const skills = [
  { name: 'Git', mark: '◆', tone: 'light' },
  { name: 'Javascript', mark: 'JS', tone: 'dark' },
  { name: 'Sass/Scss', mark: 'Sass', tone: 'light' },
  { name: 'Nest.Js', mark: '✦', tone: 'light' },
  { name: 'Storybook', mark: 'S', tone: 'dark' },
  { name: 'React', mark: '⚛', tone: 'light' },
  { name: 'TypeScript', mark: 'TS', tone: 'dark' },
  { name: 'Socket.Io', mark: '◉', tone: 'light' },
  { name: 'Next.Js', mark: 'N', tone: 'dark' },
  { name: 'Figma', mark: 'F', tone: 'light' },
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
  { label: 'GitHub', href: 'https://github.com', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { label: 'Email', href: 'mailto:hello@evrenshah.dev', icon: 'mail' },
];

const projects = [
  {
    number: '01',
    title: 'E-commerce Dashboard',
    description:
      'A clean analytics dashboard for tracking sales, customers, and product performance.',
    tags: ['React', 'JavaScript', 'CSS'],
  },
  {
    number: '02',
    title: 'Design System',
    description:
      'A flexible collection of reusable components built for consistent digital products.',
    tags: ['Storybook', 'Figma', 'Sass'],
  },
  {
    number: '03',
    title: 'Travel Experience',
    description:
      'An editorial travel platform that turns destination discovery into an enjoyable journey.',
    tags: ['Next.Js', 'TypeScript', 'UI/UX'],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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
      <section className="hero" id="top">
        <div className="container hero-inner">
          <div className="hero-copy" id="about">
            <p className="eyebrow">Hello, I&apos;m</p>

            <h1>
              Hüsna <strong>Bosun.</strong>
              <br />
              <span>QA</span> <em>Engineer</em>
              <br />
              Based in <strong>Türkiye.</strong>
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

      <section className="skills-section" id="skills">
        <div className="container">
          <div className="section-heading">
            <span>My</span> Skills
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div
                className={`skill-card ${skill.tone}`}
                key={skill.name}
              >
                <span className="skill-mark">{skill.mark}</span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="container">
          <div className="section-heading light-heading">
            My <span>Experience</span>
          </div>

          <div className="experience-list">
            <article className="experience-card featured-experience">
              <div className="company-logo google-logo">G</div>

              <div className="experience-content">
                <div className="experience-title-row">
                  <h3>Software Engineer at Google</h3>
                  <span>Nov 2019 - Present</span>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labo
                  ris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </article>

            <article className="experience-card">
              <div className="company-logo youtube-logo">▶</div>

              <div className="experience-content">
                <div className="experience-title-row">
                  <h3>Software Engineer at YouTube</h3>
                  <span>Jan 2017 - Oct 2019</span>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="container">
          <div className="projects-heading-row">
            <div className="section-heading projects-heading">
              My <span>Projects</span>
            </div>

            <span className="projects-rule" />
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-number">{project.number}</div>

                <div className="project-card-content">
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <a
                  className="project-link"
                  href="#contact"
                  aria-label={`Learn more about ${project.title}`}
                >
                  <Icon name="arrow" size={18} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - FULL WIDTH */}
      <section className="contact-section" id="contact">
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