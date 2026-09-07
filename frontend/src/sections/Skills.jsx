import SkillsMarquee from './SkillsMarquee.jsx';

function Skills({ skills }) {
  return (
      <section className="skills-section reveal" id="skills">
        <div className="container">
          <div className="section-heading">
            <span>My</span> Skills
          </div>

          <SkillsMarquee skills={skills} />
        </div>
      </section>
  );
}

export default Skills;