function Hero({ about, socialLinks, Icon }) {
  return (
    <section className="hero reveal" id="top">
      <div className="container hero-inner">
        <div className="hero-copy" id="about">
          <p className="eyebrow">Hello, I&apos;m</p>

          <h1 key={about.name}>
            <strong className="hero-name hero-line">{about.name}</strong>
            <span className="hero-line">{about.title}</span>
            <span className="hero-line">
              Based in <strong className="hero-location">{about.location}</strong>
            </span>
          </h1>

          <p className="intro">
            {about.description}
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
      </div>
    </section>
  );
}

export default Hero;