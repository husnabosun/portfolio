import Icon from '../components/Icon.jsx';


function Contact() {
    return (
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
    );
}

export default Contact;