import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
const apiHost = import.meta.env.VITE_APP_HOST;
import { useContext } from 'react';
import { ProductsContext } from '../context';

export default function Cart() {
  //getting cookies
  const [cookies, setCookie, removeCookie] = useCookies('cart');
  const { products } = useContext(ProductsContext);
  //splitting the cookie
  const cartItems = cookies.cart ? cookies.cart.split(',') : [];
  //parsing the quantities, object with id as key
  let productQuantity = {};
  //init the sub total
  let subTotal = 0;
  for (let index = 0; index < cartItems.length; index++) {
    const product = parseInt(cartItems[index]);
    if (product) {
      productQuantity[product] = (productQuantity[product] || 0) + 1; //increment quantity for the same product
    }
    subTotal += parseFloat(products[cartItems[index]-1].cost);
  }

  //sort products by quantity
  const sortedProducts = Object.entries(productQuantity).sort((a, b) => b[1] - a[1]);

  return (
    <Container>
      {/* titles */}
      <div className='d-flex justify-content-between'>
        <h1 className='border-mocha my-3 p-3 foreground-latte'>here's what you have so far</h1>
        <div></div>
        <h1 className='border-mocha my-3 p-3 foreground-latte'>sub-total</h1>
      </div>
      <div className='d-flex'>
        <div className='align-items-center justify-content-center my-3 col-8'>
          {/* looping thru sorted products to display everything, going by productId as the key, with quantity as index to only show each product once */}
          {sortedProducts.map(([productId, quantity]) => (
            <div key={products[productId-1].product_id} className="d-flex border-mocha foreground-latte my-3">
              <div className='col-3'>
                <img className='img-fluid' src={`${apiHost}/images/${products[productId-1].image_filename}`} alt={products[productId-1].name} /></div>
              <div className='col mx-3'>
                  <p className='fs-4'>{products[productId-1].name}</p>
                  <p>price per unit: ${products[productId-1].cost}</p>
                  <p>in cart: {quantity}</p>
                  <p>total: ${(products[productId-1].cost * quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='align-items-center justify-content-center my-3 mx-5 col-3'>
            <div className='d-flex foreground-latte border-mocha'>
              <p className='fs-1 m-1'>{subTotal.toFixed(2)}</p>
            </div>
        </div>
      </div>
        <Link to={`/`} className='text-decoration-none'><button type='submit' className='col-4 rounded-0 btn btn-espresso mx-1 my-2 mt-3'>continue shopping</button></Link>
        <Link to={`/`} className='text-decoration-none'><button type='submit' className='col-4 rounded-0 btn btn-espresso mx-1 my-2 mt-3'>checkout</button></Link>
    </Container>
  );
}