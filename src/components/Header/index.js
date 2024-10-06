import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="header-container">
    <div className="logo-and-title-container">
      <img
        alt="wave"
        className="logo"
        src="https://media.licdn.com/dms/image/v2/C560BAQF9XZN8SBUwKA/company-logo_200_200/company-logo_200_200/0/1630578251876/synlabs_logo?e=1736380800&v=beta&t=s4hC0APOVtdcQeG6gNRVQf98nv_t8LAtlcAqoeLRfPs"
      />
    </div>

    <ul className="nav-items-list">
      <li className="link-item">
        <Link className="route-link" to="/">
          Home
        </Link>
      </li>

      <li className="link-item">
        <Link className="route-link" to="/contact">
          Contact
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header
