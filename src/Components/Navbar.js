import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <nav className={`navbar fixed-top navbar-expand-lg bg-${props.mode === "light" ? "primary" : "dark"}`} data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Breaking Now</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link  hoverable" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link  hoverable" aria-current="page" to="/about">About us</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </Link>
              <ul className={`dropdown-menu bg-${props.mode}`}>
                <li><Link className={`dropdown-item dropdown-item-${props.mode}`} to="/business">Business</Link></li>
                <li><Link className={`dropdown-item dropdown-item-${props.mode}`} to="/entertainment">Entertainment</Link></li>
                <li><Link className={`dropdown-item dropdown-item-${props.mode}`} to="/general">General</Link></li>
                <li><Link className={`dropdown-item dropdown-item-${props.mode}`} to="/health">Health</Link></li>
                <li><Link className={`dropdown-item dropdown-item-${props.mode}`} to="/science">Science</Link></li>
                <li><Link className={`dropdown-item dropdown-item-${props.mode}`} to="/sports">Sports</Link></li>
                <li><Link className={`dropdown-item dropdown-item-${props.mode}`} to="/technology">Technology</Link></li>
              </ul>
            </li>
          </ul>
          <input type="checkbox" className="btn-check mx-2" id="btn-check-2-outlined"  onChange={props.togglePagination}/>
          <label className={`btn m-2 btn-outline-${props.mode==="light"?"light":"info"}`} htmlFor="btn-check-2-outlined">Infinite Scroll</label><br />
          <div className='mx-1'>
            <input type="checkbox" className="checkbox" id="checkbox" onChange={props.toggleMode} />
            <label htmlFor="checkbox" className="checkbox-label">
              <i className="fas fa-moon"></i>
              <i className="fas fa-sun"></i>
              <span className="ball"></span>
            </label>
          </div>
        </div>
      </div>
    </nav>
  )
}


