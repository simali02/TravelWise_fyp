import React from "react";
import { Link } from "react-router-dom";
import '../assets/css/FooterStyles.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <div className="footer-logo">
            <img
              src="/footer-logo.png"
              alt="Logo"
              className="footer-logo-img"
              style={{ marginBottom: 0}}
            />
            <h2 className="h2-light" style={{color: 'var(--primary)', fontSize: '2.6rem'}}>Travel Wise</h2>
          </div>
        </div>
        <div className="footer-column">
          <h3 className="h3-light">Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="h3-light">Follow Us</h3>
          <ul className="social-links">
            <li>
              <Link to="/facebook">Facebook</Link>
            </li>
            <li>
              <Link to="/twitter">Twitter</Link>
            </li>
            <li>
              <Link to="/instagram">Instagram</Link>
            </li>
            <li>
              <Link to="/linkedin">LinkedIn</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="h3-light">Contact Us</h3>
          <p>Email: contact@travelwise.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Main Street, Anytown, USA</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Travel Wise. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
