import { Link } from 'react-router-dom';

export default function Navbar() {{
    return (
      <nav className="navbar navbar-expand-lg foreground-latte">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className='text-decoration-none font-dark-chocolate fs-1'><span >cawfee</span></Link>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
              <Link to="/" className="nav-link fs-3 font-dark-chocolate" href="#">Home</Link>
              </li>
              <li className="nav-item">
              <Link to="/cart" className="nav-link" href="#">Cart</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link" href="#">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link" href="#">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}}

