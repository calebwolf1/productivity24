import { NavLink } from 'react-router-dom';
import Logo from '../whoosh.png';
import '../Fonts.css'
import './Navbar.css'

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="container">
          {/* <div className="logo">
            <Logo />
          </div> */}
          <img src={Logo} alt="Logo" className='logo'/>;
          <div className="nav-elements">
            <ul>
              <li>
                <NavLink to="/">Customers</NavLink>
              </li>
              <li>
                <NavLink to="/">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/">Pricing</NavLink>
              </li>
              <li>
                <NavLink to="/login">Log in</NavLink>
              </li>
              <li>
                <NavLink to="/login">Sign up</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
};

export default Navbar