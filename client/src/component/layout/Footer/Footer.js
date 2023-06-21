import React from 'react';
import appStore from '../../../images/Appstore.png';
import playStore from '../../../images/Playstore.png';
import './Footer.css';
import { FaLinkedin, FaGithub, FaCode } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id='footer'>
      <div className='footerContent'>
        <div className='footerSection'>
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App for Android and iOS mobile phones</p>
          <div className='appIcons'>
            <img src={playStore} alt='Playstore' />
            <img src={appStore} alt='Appstore' />
          </div>
        </div>
        <div className='footerSection'>
          <h1>EasyShop.in</h1>
          <p>EasyShop: Simplifying Your Online Retail Experience!</p>
          <p>&copy; 2023 EasyShop.in. All rights reserved.</p>
        </div>
        <div className='footerSection'>
          <h4>Follow Us</h4>
          <div className='socialIcons'>
            <a href='https://www.linkedin.com/in/priyanshu1101/' className='socialIcon'><FaLinkedin size={30} /></a>
            <a href='https://github.com/priyanshu1101' className='socialIcon'><FaGithub size={30} /></a>
            <a href='https://leetcode.com/priyanshu_1101/' className='socialIcon'><FaCode size={30} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
