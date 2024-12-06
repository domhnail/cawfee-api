import { Link } from 'react-router-dom';
import { GlowCapture, Glow } from '@codaworks/react-glow';
import { useNavigate } from 'react-router-dom';
import IconShoppingCart from './CartIcon';

const apiHost = import.meta.env.VITE_APP_HOST;

const apiUrl = `${apiHost}/api/users/logout`;

//logout function
function userLogout(navigate, setIsLoggedIn) {
  async function postData() {
    const response = await fetch(apiUrl, {
      //sending the post to the API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      setIsLoggedIn(false)
      //calling navigate to duck a page refresh
      await navigate('/logout');
    } else {
      console.error('Error:', await response.text());
    }
  }
  postData();
}


export default function Navbar({ isLoggedIn , setIsLoggedIn}) {
  const navigate = useNavigate();
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
                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link to="/signup" className="nav-link nav-link fs-3 link-dark-chocolate glow">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link nav-link fs-3 link-dark-chocolate glow">Login</Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button className="nav-link fs-3 link-dark-chocolate glow" onClick={() => userLogout(navigate, setIsLoggedIn)}>Logout</button>
                  </li>
                )}
                <li className="nav-item">
                <Link to="/cart" className="nav-link fs-3 link-dark-chocolate glow" href="#"><IconShoppingCart /></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </GlowCapture>
    );
}

