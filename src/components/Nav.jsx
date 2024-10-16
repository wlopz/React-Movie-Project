import React from 'react'
import logo from '../assets/flixstr_logo.png'
import { Link } from 'react-router-dom'
import { handleClick } from '../utils/errors'
const Nav = () => {
  return (
    <nav>
      <div className="nav__container">
        <div className="nav__logo--wrapper">
          <Link to="/">
            <img src={logo} alt="" className="nav__logo" />
          </Link>
          {/* <a href="/" className='nav__logo--a--link'><img src={logo} alt="" className="nav__logo" />
          </a> */}
        </div>
        <ul className="nav__links--wrapper">
          <Link to="/" className="nav__link">
            <span className="nav__link--anchor">Home</span>
          </Link>
          {/* <li className="nav__link">
            <a href="/" className="nav__link--anchor">Home</a>
          </li> */}
          <Link to="/search" className="nav__link">
            <span className="nav__link--anchor">Find your flix</span>
          </Link>
          {/* <li className="nav__link">
            <a href="/search" className="nav__link--anchor">Find your flix</a>
          </li> */}
          <Link to="/" className="nav__link" onClick={handleClick}>
            <span className="nav__link--anchor no-pointer contact__button">Contact Us</span>
          </Link>
          {/* <li className="nav__link">
            <a href="#" className="nav__link--anchor no-pointer contact__button">Contact Us</a>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}

export default Nav