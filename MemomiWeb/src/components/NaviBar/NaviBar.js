import React from 'react';
import { Link } from 'react-router-dom';
import './NaviBar.css';

const NaviBar = () => {
  return (
    <nav>
      <ul>
        <li className="Logo">
          <Link to="/">
            <img src="../public/Logo.png" alt="Logo" />
          </Link>
        </li>
        <li className = 'NaviBar-link'><Link to="/about">About Us</Link></li>
        <li className = 'NaviBar-link'><Link to="/features">Services</Link></li>
        <li className = 'NaviBar-link'><Link to="/contact">Contact Us</Link></li>
      </ul>
    </nav>
  );
};

export default NaviBar;