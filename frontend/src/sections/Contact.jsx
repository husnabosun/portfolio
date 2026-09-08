import Icon from '../components/Icon.jsx';


function Contact() {
  return (
    <section className="contact-section reveal" id="contact">
      <div className="container contact-inner">
        <div>
          <p className="eyebrow">Open to what comes next.

          </p>

          <h2>
            Let’s talk about software, quality,
            and problems <span> worth solving. </span>
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