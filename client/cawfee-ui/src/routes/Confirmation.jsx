import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Confirmation() {
  return (
    <Container>
      <div className="container p-5 align-items-center">
        <div className="card align-items-center shadow-lg border-mocha foreground-latte p-5 my-5">
            <h2>consider your money burnt, and your products in the mail</h2>
            <Link to={`/`} className='text-decoration-none'><button type='submit' className='rounded-0 btn btn-espresso mx-1 my-2 mt-3'>continue shopping</button></Link>
        </div>
      </div>
    </Container>
  )
}