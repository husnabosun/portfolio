import { useEffect, useState } from 'react';
import API_URL from '../config/api.js';
import formatExperienceDate from '../utils.js';
import '../App.css';

function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/education`)
      .then((res) => res.json())
      .then((data) => setEducation(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error('Education fetch error:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="education-section reveal" id="education">
      <div className="container">
        <div className="section-heading light-heading">
          My <span>Education</span>
        </div>

        {loading && (
          <div className="education-loading" role="status" aria-label="Loading education history">
            <span className="loading-spinner" />
          </div>
        )}

        {!loading && error && (
          <p className="education-error">Couldn't load education history. Please try again later.</p>
        )}

        {!loading && !error && (
          <div className="education-timeline">
            {education.map((edu) => (
              <div className="education-item reveal-item" key={edu.id}>
                <span className="education-dot" aria-hidden="true" />

                <article className="education-card">
                  <div className="education-card-header">
                    <div className="school-logo">
                      {edu.logo_url ? (
                        <img src={edu.logo_url} alt={`${edu.school_name} logo`} />
                      ) : (
                        edu.school_name?.charAt(0)
                      )}
                    </div>

                    <div className="education-title-group">
                      <h3>{edu.school_name}</h3>
                      <div className="education-meta">
                        <p className="education-degree">{edu.degree}</p>
                        <span className="education-dates">
                          {formatExperienceDate(edu.start_date)} - {formatExperienceDate(edu.end_date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {edu.description && <p className="education-description">{edu.description}</p>}
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Education;
