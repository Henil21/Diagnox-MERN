import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <h2>DiagnoxAI</h2>
          </Link>
        </div>
        
        <div className="navbar-links">
          <ul className="nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/brain-diagnosis">Brain Diagnosis</Link></li>
            <li><Link to="/diabetes">Diabetes</Link></li>
            <li><Link to="/vision-assist">Vision Assist</Link></li>
            
            <li className="dropdown">
              <span 
                className="dropdown-toggle"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                Other
              </span>
              <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <li><Link to="/heart-attack">Heart Attack</Link></li>
                <li><Link to="/medicine-recommendation">Medical Recommend</Link></li>
              </ul>
            </li>
            
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
