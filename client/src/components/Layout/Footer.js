import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo-box">
        <picture className="footer__logo">
          <source
            srcSet={`${require("../../assets/images/logo-green-small-1x.png")} 1x, ${require("../../assets/images/logo-green-small-2x.png")} 2x`}
            media="(max-width: 37.5em)"
          />
          <img
            srcSet={`${require("../../assets/images/logo-green-small-1x.png")} 1x, ${require("../../assets/images/logo-green-small-2x.png")} 2x`}
            alt="Full logo"
            src={require("../../assets/images/logo-green-2x.png")}
          />
        </picture>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <div className="footer__navigation">
            <ul className="footer__list">
              <li className="footer__item">
                <a href="#" className="footer__link">
                  Company
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__link">
                  Contact us
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__link">
                  Careers
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__link">
                  Privacy policy
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__link">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-1-of-2">
          <p className="footer__copyright">
            Built by Victoria Kastanenka for her online portfolio. This project is an expansion and combination of two projects from the courses Advanced CSS and Sass, and Node.js, Express, MongoDB & More by Jonas Schmedtmann. The original project was built around server side rendering while this one has been altered to utilize React for the front end architecture. Other additions include offering users opportunities to use API features not found in the original project, such as writing reviews for users, or offering admin features such as editing reviews, adding tours, and more. Responsive design was also elaborated upon to include mobile devices with a minimum width of 320 px. As mentioned before the front end was built using React and Sass, while Node.js, Express, Mongoose, and MongoDB were used to build the back end architecture. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
