import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
const apiHost = import.meta.env.VITE_APP_HOST;
import { Container } from 'react-bootstrap';

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate(); 

  const apiUrl = `${apiHost}/api/users/login`;

  //login function
  async function userLogin(data) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include', //sending cookie
      });

      if (response.ok) {
        //calling navigate to duck a page refresh
        await checkSession();
        navigate('/');
      } else {
        console.error('Error:', await response.text());
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async function checkSession() {
    const sessionResponse = await fetch(`${apiHost}/api/users/getsession`, {
      method: 'GET',
      credentials: 'include',
    });
  
    if (sessionResponse.ok) {
      const sessionData = await sessionResponse.json();
      console.log('User session:', sessionData.customer); // Check if session data is present
    } else {
      console.error('Not logged in');
    }
  }

  return (
    <Container>
      <div className="container p-5 align-items-center">
        <div className="card align-items-center shadow-lg border-mocha foreground-latte p-5 my-5">
          <form onSubmit={handleSubmit(userLogin)} method="post" encType="multipart/form-data">
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
                type="password"
                className="form-control"
              />
              {errors.password && <span className="text-danger">Password is required.</span>}
            </div>
            <button type="submit" className="rounded-0 btn btn-espresso">Login</button>
            <Link to="/" className="rounded-0 btn btn-espresso ms-3">Cancel</Link>
            <Link to="/signup" className="rounded-0 btn btn-espresso ms-3">Sign Up</Link>
          </form>
        </div>
      </div>
    </Container>
  );
}
