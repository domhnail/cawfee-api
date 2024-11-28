import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
const apiHost = import.meta.env.VITE_APP_HOST;
import { useContext } from 'react';
import { ProductsContext } from '../context';

export default function Home() {
  const { products } = useContext(ProductsContext);

  return (
    <Container>
      <h1 className='border-mocha my-3 p-1 foreground-latte text-center'>for your perusal...</h1>
      <div className='row row-cols-4 d-flex align-items-center justify-content-center my-3'>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={product.product_id} className='col-3'>
              <div className='card text-center shadow-lg border-mocha foreground-latte my-3'>
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <Link to={`/details/${product.product_id}`}>
                    <img className='img-fluid mb-3' src={`${apiHost}/images/${product.image_filename}`} alt={product.name} />
                  </Link>
                  <p className='card-text'>${product.cost}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </Container>
  );
}