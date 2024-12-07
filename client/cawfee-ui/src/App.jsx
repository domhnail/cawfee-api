import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './ui/Nav';
import { useState, useEffect } from 'react';
const apiHost = import.meta.env.VITE_APP_HOST;
import { ProductsContext } from './context';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const apiUrl = `${apiHost}/api/products/all`;
  const getSessionUrl = `${apiHost}/api/users/getsession`;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching data...');
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Data fetched successfully.');
        const data = await response.json();
        setProducts(data.product);
      } catch (error) {
        console.error('Error fetching data:', error);
        setProducts([]);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    //check session status
    async function checkSession() {
      try {
        const response = await fetch(getSessionUrl, {
          method: 'GET',
          credentials: 'include', //make sure to include credentials
        });
        if (response.ok) {
          const data = await response.json();
          //if the user is logged in, set isLoggedIn to true
          setIsLoggedIn(true);
        } else {
          //if session is not found, set to false
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false);
      }
    }
    checkSession();
  }, [getSessionUrl]);

  return (
    products.length > 0 ? (
      <ProductsContext.Provider value={{ products }}>
        <div className="container-fluid p-0">
          {/* rendering navbar here */}
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <div className="container">
            <main className="d-flex flex-column flex-grow-1">
              <div className="container">
                {/* rendering all components here */}
                <Outlet context={{ isLoggedIn, setIsLoggedIn}}/>
              </div>
            </main>
          </div>
        </div>
      </ProductsContext.Provider>
    ) : (
      <p>No products available.</p>
    )
  )
}
export default App
