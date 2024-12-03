import { Link } from 'react-router-dom';
import { GlowCapture, Glow } from '@codaworks/react-glow'

export default function Navbar() {{
    return (
      <GlowCapture>
        <nav className="navbar navbar-expand-lg foreground-latte">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Glow color='green'>
              <Link to="/" className='text-decoration-none link-dark-chocolate fs-1 glow:text-glow/50 glow:bg-red-100'><span >cawfee</span></Link>
            </Glow>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="/" className="nav-link fs-3 link-dark-chocolate glow" href="#">Home</Link>
                </li>
                <li className="nav-item">
                <Link to="/cart" className="nav-link fs-3 link-dark-chocolate glow" href="#">Cart</Link>
                </li>
                <li className="nav-item">
                <Link to="/signup" className="nav-link fs-3 link-dark-chocolate glow" href="#">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link fs-3 link-dark-chocolate" href="#">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/logout" className="nav-link fs-3 link-dark-chocolate" href="#">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </GlowCapture>
    );
}}

