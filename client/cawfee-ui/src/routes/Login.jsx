import { useForm } from "react-hook-form"
import {Link} from 'react-router-dom';
const apiHost = import.meta.env.VITE_APP_HOST;
import { Container } from 'react-bootstrap';


export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const apiUrl = `${apiHost}/api/users/login`;

  function userLogin(data){
    //form
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    async function postData() {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error('Error:', await response.text());
      }
    }

    postData();
  }

  return (
    <Container>
      <div className='container p-5 align-items-center'>
        <div className='card align-items-center shadow-lg border-mocha foreground-latte p-5 my-5'>
          <form onSubmit={handleSubmit(userLogin)} method="post" encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">email</label>
            <input {...register("email", { required: true })} type="text" className="form-control" />
            {errors.email && <span className="text-danger">Email is required.</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">password</label>
            <input {...register("password", { required: true })} type="text" className="form-control" />
            {errors.password && <span className="text-danger">Password is required.</span>}
          </div>
          <button type="submit" className="rounded-0 btn btn-espresso">Login</button>
          <Link to="/" className="btn btn-espresso ms-3">Cancel</Link>
          <Link to="/signup" className="btn btn-espresso ms-3">Sign up</Link>
          </form>
        </div>
      </div>
    </Container>
  );
} 