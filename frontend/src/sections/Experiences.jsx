function Experiences({ experiences, formatExperienceDate }) { 
    return (
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

    );
}

export default Experiences;