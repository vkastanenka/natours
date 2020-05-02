// React
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Auxiliary from '../../components/HigherOrder/Auxiliary';

const Navbar = () => {
  let navUser = (
    <Auxiliary>
      <Link>Log in</Link>
      <Link>Sign up</Link>
    </Auxiliary>
  )

  return (
    <header className="header">
      <nav className="nav nav--tour">
        <Link className='nav__el'>All tours</Link>
        <div className="header__logo">
          <img src={require('../../assets/images/logo-white.png')} alt="Natours Logo"/>
        </div>
      </nav>
      <nav className="nav--user">
        {navUser}
      </nav>
    </header>
  );
}

export default Navbar;
