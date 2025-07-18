import React from 'react';
import appStore from '../../../images/Appstore.png';
import playStore from '../../../images/Playstore.png';
import { FaLinkedin, FaGithub, FaCode, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const isFooterDisabled = location.pathname.includes('admin');

  if (isFooterDisabled) return null;

  return (
    <footer className='footer'>
      <div className='footer-content'>
        {/* Newsletter Section */}
        <div className="newsletter">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for the latest deals and product updates</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <h3 className="brand-logo">EasyShop.in</h3>
            <p>
              Your ultimate shopping destination for quality products at unbeatable prices. 
              We're committed to providing an exceptional shopping experience with fast delivery 
              and excellent customer service.
            </p>
            
            <div className="app-download">
              <img src={playStore} alt='Download on Google Play' />
              <img src={appStore} alt='Download on App Store' />
            </div>
            
            <div className="social-links">
              <a href='https://www.linkedin.com/in/priyanshu1101/' className='social-link' target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={18} />
              </a>
              <a href='https://github.com/priyanshu1101' className='social-link' target="_blank" rel="noopener noreferrer">
                <FaGithub size={18} />
              </a>
              <a href='https://leetcode.com/priyanshu_1101/' className='social-link' target="_blank" rel="noopener noreferrer">
                <FaCode size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/search">Search</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul className="footer-links">
              <li><a href="/help">Help Center</a></li>
              <li><a href="/shipping">Shipping Info</a></li>
              <li><a href="/returns">Returns & Exchanges</a></li>
              <li><a href="/size-guide">Size Guide</a></li>
              <li><a href="/track-order">Track Your Order</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="footer-links">
              <li>
                <FaEnvelope size={14} style={{ marginRight: '0.5rem', color: 'var(--primary-400)' }} />
                support@easyshop.in
              </li>
              <li>
                <FaPhone size={14} style={{ marginRight: '0.5rem', color: 'var(--primary-400)' }} />
                +91 98765 43210
              </li>
              <li>
                <FaMapMarkerAlt size={14} style={{ marginRight: '0.5rem', color: 'var(--primary-400)' }} />
                Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; 2024 EasyShop.in. All rights reserved. | Privacy Policy | Terms of Service</p>
          
          <div className="payment-methods">
            <span>We Accept:</span>
            <div className="payment-icon">VISA</div>
            <div className="payment-icon">MC</div>
            <div className="payment-icon">AMEX</div>
            <div className="payment-icon">UPI</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;