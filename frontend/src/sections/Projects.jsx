import Icon from '../components/Icon.jsx';

function Projects({ projects, projectsLoading }) { 
    return (
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
    );
}
export default Projects;