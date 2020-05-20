// React
import React from "react";

// Components
import ContactForm from "../../../components/Forms/Contact";

const Contact = () => {
  return (
    <section className="section-contact">
      <div className="row">
        <div className="contact">
          <div className="contact__form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
