import {Link} from 'react-router-dom';
import { Container } from 'react-bootstrap';


export default function Logout() {
  return (
    <Container>
      <div className='container p-5 align-items-center'>
        <div className='card align-items-center shadow-lg border-mocha foreground-latte p-5 my-5'>
          <h1>you have been logged out</h1>
          <h5>goodbye, user</h5>
          <Link to="/" className="rounded-0 btn btn-espresso m-3">alright, thanks</Link>
          <Link to="/login" className="rounded-0 btn btn-espresso m-3">put me back in</Link>
        </div>
      </div>
    </Container>
  )
}