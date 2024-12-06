import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './ui/Nav';
import { useState, useEffect } from 'react';
const apiHost = import.meta.env.VITE_APP_HOST;
import { ProductsContext } from './context';

function App() {
  const [products, setProducts] = useState([]);

  const apiUrl = `${apiHost}/api/products/all`;
  //t0d0, isLoggedIn

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

  return (
    products.length > 0 ? (
      <ProductsContext.Provider value={{ products }}>
        <div className="container-fluid p-0">
          {/* rendering navbar here */}
            <Navbar />
          <div className="container">
            <main className="d-flex flex-column flex-grow-1">
              <div className="container">
                {/* rendering all components here */}
                <Outlet />
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
