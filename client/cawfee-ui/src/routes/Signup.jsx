import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const apiHost = import.meta.env.VITE_APP_HOST;
import { Container } from 'react-bootstrap';

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  //state for managing error messages
  const [errorMessage, setErrorMessage] = useState('');

  const apiUrl = `${apiHost}/api/users/signup`;

  //signup function
  async function addUser(data) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorText = await response.text();
        //setting the error text
        setErrorMessage(errorText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      //setting the error text
      setErrorMessage('An error occurred while processing your request. Please try again.');
    }
  }

  return (
    <Container>
      <div className="container p-5 align-items-center">
        <div className="card align-items-center shadow-lg border-mocha foreground-latte p-5 my-5">
          {/* error alert that'll display if something goes wrong with the sign up */}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(addUser)} method="post" encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                {...register("email", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.email && <span className="text-danger">Email is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                {...register("password", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.password && <span className="text-danger">Password is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                {...register("first_name", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.first_name && <span className="text-danger">First name is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                {...register("last_name", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.last_name && <span className="text-danger">Last name is required.</span>}
            </div>
            <button type="submit" className="rounded-0 btn btn-espresso ms-3">Add</button>
            <Link to="/" className="rounded-0 btn btn-espresso ms-5">Cancel</Link>
          </form>
          <p className="text-muted m-2">Password requires a minimum 8 characters, 1 digit, upper and lowercase characters.</p>
        </div>
      </div>
    </Container>
  );
}
