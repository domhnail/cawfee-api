import { useForm } from "react-hook-form"
import {Link} from 'react-router-dom';
const apiHost = import.meta.env.VITE_APP_HOST;
import { Container } from 'react-bootstrap';


export default function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const apiUrl = `${apiHost}/api/users/signup`;

  function addUser(data){
    //form
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);

    async function postData() {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      if (response.ok) {
        window.location.href = '/login';
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
          <form onSubmit={handleSubmit(addUser)} method="post" encType="multipart/form-data">
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
          {/* TODO: mininum three tags, comma separation, use regex, still needs work. */}
          <div className="mb-3">
            <label className="form-label">first name</label>
            <input {...register("first_name", { required: true })} type="text" className="form-control" />
            {errors.first_name && <span className="text-danger">First name is required.</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">last name</label>
            <input {...register("last_name", { required: true })} type="text" className="form-control" />
            {errors.last_name && <span className="text-danger">Last name is required.</span>}
          </div>
          <button type="submit" className="rounded-0 btn btn-espresso">Add</button>
          <Link to="/" className="btn btn-espresso ms-3">Cancel</Link>
          </form>
        </div>
      </div>
    </Container>
  )
}
