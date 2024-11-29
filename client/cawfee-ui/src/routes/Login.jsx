import React, { useState } from 'react';
import { Container } from 'react-bootstrap';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container>
      <div className='container p-5 align-items-center'>
        <div className='card align-items-center shadow-lg border-mocha foreground-latte p-5 my-5'>
          <h1 className='my-3 mx-3'>login</h1>
          <form className='m-3' onSubmit={handleSubmit}>
            <label className='mx-2' htmlFor="email">email:</label>
            <br />
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label className='mx-2' htmlFor="password">password:</label>
            <br />
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button className='btn btn-espresso my-2' type="submit">login</button>
          </form>
        </div>
      </div>
    </Container>
  );
} 