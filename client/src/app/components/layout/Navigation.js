import React, { useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { CgMathPlus } from 'react-icons/cg'
import { CgProfile } from 'react-icons/cg';
import { GrProjects } from 'react-icons/gr';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../services';

import Logo from '../../assets/logo.svg';

import * as Routes from '../../routes';

const Navigation = ({activePage = 'profile'}) => {
  const [ menuLarge, setMenuLarge ] = useState(false);
  const { signOut } = useAuth();

  return(
    <div className={`navigation${menuLarge ? '__large' : ''}`}>
      <div className='navigation--content'>
        { 
          menuLarge ?
          <button><CgMathPlus className='navigation--cross' onClick={() => setMenuLarge(false)}/></button> : 
          <button><HiOutlineMenu className='navigation--hambuger' onClick={() => setMenuLarge(true)}/></button>
        }
        <div className='navigation--links'>
          <Link className={`navigation--icon-container${activePage === 'profile' ? '__active' : ''}`} to={Routes.PROFILE}>
            <CgProfile className='navigation--icon'/>
            {
              menuLarge ?
              <span className='navigation--icon-label'>Profiel</span> : null
            }
          </Link>
          <Link className={`navigation--icon-container${activePage === 'projects' ? '__active' : ''}`} to={Routes.PROJECTS}>
            <GrProjects className='navigation--icon projects'/>
            {
              menuLarge ?
              <span className='navigation--icon-label'>Projecten</span> : null
            }
          </Link>
          <div className='logout' onClick={() => signOut()}>
            <FiLogOut className='navigation--icon'/>
            {
              menuLarge ?
              <span className='navigation--icon-label'>Afmelden</span> : null
            }
          </div>
        </div>
        <div className='navigation--logo--container'>
          <img src={Logo} alt='Logo' className='navigation--logo'/>
          { menuLarge && <span className='navigation--logo-label'>MxrBoard</span> }
        </div>
      </div>
    </div>
  )
};

export default Navigation;