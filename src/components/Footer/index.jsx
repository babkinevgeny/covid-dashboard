import React from 'react';
import schoolLogo from './rs_school.svg';

const Footer = () => (
  <footer className="footer">
    <div className="footer__column footer__column--left">
      <h6>Command:</h6>
      <ul>
        <li><a href="https://github.com/lbratkovskaya">lbratkovskaya</a></li>
        <li><a href="https://github.com/babkinevgeny">babkinevgeny</a></li>
      </ul>
    </div>
    <div className="footer__column footer__column--right">
      <a href="https://rs.school/js/index.html">
        <img src={schoolLogo} alt="RSSchool" />
      </a>
      <h6>2020</h6>
    </div>
  </footer>
);

export default Footer;
