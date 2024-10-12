import React from 'react'
import logo from '../assets/flixstr_logo.png'
const Nav = () => {
  return (
    <nav>
      <div className="nav__container">
        <div className="nav__logo--wrapper">
          <a href="/"><img src={logo} alt="" className="nav__logo" /></a>
        </div>
        <ul className="nav__links--wrapper">
          <li className="nav__link">
            <a href="/" className="nav__link--anchor">Home</a>
          </li>
          <li className="nav__link">
            <a href="/search" className="nav__link--anchor">Find your flix</a>
          </li>
          <li className="nav__link">
            <a href="#" className="nav__link--anchor no-pointer contact__button">Contact Us</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav