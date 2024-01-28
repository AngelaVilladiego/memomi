import React from 'react';
import { Link } from 'react-router-dom';
import './NaviBar.css';
import Logo from './Logo.png'
import Arrow from './arrow_down.png'
import User from './account_box.png'

const NaviBar = () => {
  return (
    <nav className='NaviBar absolute t-0 mb-1 w-full'>
      <div className="flex m-0 font-sans w-full justify-between content-center items-center">
        <div className='justify-self-start mr-30 pl-10'>
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="flex w-3/5 p-1 pr-2 mr-2 justify-evenly">
          <div className = 'NaviBar-link mr-2'>
            <Link to="/about" className='flex content-baseline justify-evenly'>
              About Us 
              <img src={Arrow} alt='' className='ml-3 mt-0.5 h-4'/>
            </Link>
          </div>
          <div className = 'NaviBar-link mr-2'>
            <Link to="/features" className='flex content-baseline justify-evenly'>
              Features <img src={Arrow} alt='' className='ml-3 mt-0.5 h-4'/>
            </Link>
          </div>
          <div className = 'NaviBar-link'>
            <Link to="/contact" className='flex content-baseline justify-evenly justify-self-end'>
              Contact Us <img src={Arrow} alt='' className='ml-3 mt-0.5 h-4'/>
            </Link>
          </div>
          <div className = 'User flex p-0 flex-col justify-center items-center content-center'>
            <img src={User} alt="User" className ='bg-memoblue-400 border-2 border-memoblue-400 rounded-md' />
            <p className='font-sans font-semibold text-memoblue-400'>Jane Doe</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NaviBar;