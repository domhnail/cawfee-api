const apiHost = import.meta.env.VITE_APP_HOST;
import { useContext } from 'react';
import { ProductsContext } from '../context';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Details() {
  const { products } = useContext(ProductsContext);
  console.log('Products in Details:', products);
  const { id } = useParams();
  const product = products.find((p) => p.product_id  === parseInt(id,10));
  const [cookies, setCookie, removeCookie] = useCookies('cart');

  return (
    <Container>
      <h1 className='border-mocha my-3 p-1 foreground-latte text-center'>{product.name}</h1>
      <div className='row row-cols-2 d-flex align-items-center justify-content-center my-3'>
        <div className='card text-center shadow-lg border-mocha foreground-latte my-3'>
          <div className='card-body'>
            <img className='img-fluid mb-3' src={`${apiHost}/images/${product.image_filename}`} alt={product.name} />
          </div>
        </div>
        <div className='card text-center border-mocha foreground-latte my-3 py-3'>
          <p className='font-dark-chocolate fs-4'>${product.cost}</p>
          <p className='font-dark-chocolate fs-4'>{product.description}</p>
          <Link to={`/`} className='text-decoration-none'><button type='submit' className='col-4 rounded-0 btn btn-espresso mx-1 mt-3'>no thanks</button></Link>
          <Link to={`/`} className='text-decoration-none'><button type='submit' className='col-4 rounded-0 btn btn-espresso mx-1 mt-3' onClick={() => { let cartValue = cookies.cart ? [cookies.cart] : []; cartValue.push(product.product_id); setCookie('cart', cartValue.join(','), { path: '/' });
          }}>yes please</button></Link>
        </div>
      </div>
    </Container>
  );
}

