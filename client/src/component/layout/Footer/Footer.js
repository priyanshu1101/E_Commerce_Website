import React from 'react'
import appStore from '../../../images/Appstore.png';
import playStore from '../../../images/Playstore.png';
import './Footer.css';
import { FaLinkedin, FaGithub, FaCode } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt='Playstore'></img>
                <img src={appStore} alt='Appstore'></img>
            </div>
            <div className='midFooter'>
                <h1>EasyShop.in</h1>
                <p>EasyShop: Simplifying Your Online Retail Experience!</p>
                <p>Copyrights 2023 &copy; Priyanshu :)</p>
            </div>
            <div className='leftFooter'>
                <h4>Follow Us</h4>
                <a href='https://www.linkedin.com/in/priyanshu1101/' className='socialIcon' style={{ padding: "10px" }}><FaLinkedin size={30} /></a>
                <a href='https://github.com/priyanshu1101' className='socialIcon' style={{ padding: "10px" }}><FaGithub size={30} /></a>
                <a href='https://leetcode.com/priyanshu_1101/' className='socialIcon' style={{ padding: "10px" }}><FaCode size={30} /></a>
            </div>
        </footer>
    )
}

export default Footer;
