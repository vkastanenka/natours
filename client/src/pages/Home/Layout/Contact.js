// React
import React from "react";

// Components
import ContactForm from "../../../components/Forms/Contact";

const Contact = () => {
  return (
    <section class="section-contact">
      <div class="row">
        <div class="contact">
          <div class="contact__form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
