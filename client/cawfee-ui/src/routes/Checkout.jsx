import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useCookies } from "react-cookie";

const apiHost = import.meta.env.VITE_APP_HOST;

export default function Checkout() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);

  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = `${apiHost}/api/products/purchase`;

  async function handlePurchase(data) {
    const cart = cookies.cart;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // include session cookies
        body: JSON.stringify({ ...data, cart }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Purchase successful:', result);

        // clear the cart cookie
        removeCookie('cart', { path: '/' });

        navigate('/confirmation');
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage('An error occurred while processing your purchase. Please try again.');
    }
  }


  return (
    <Container>
      <div className="container p-5 align-items-center">
        <div className="card align-items-center shadow-lg border-mocha foreground-latte p-5 my-5">
          {/* Error alert */}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(handlePurchase)} method="post">
            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                {...register("street", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.street && <span className="text-danger">Street is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                {...register("city", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.city && <span className="text-danger">City is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Province</label>
              <input
                {...register("province", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.province && <span className="text-danger">Province is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                {...register("country", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.country && <span className="text-danger">Country is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Postal Code</label>
              <input
                {...register("postal_code", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.postal_code && <span className="text-danger">Postal code is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Credit Card</label>
              <input
                {...register("credit_card", {
                  required: true,
                  pattern: /^\d{8}$/, //8 digits
                })}
                type="text"
                className="form-control"
                maxLength="8" //limits input to 16 characters
              />
              {errors.credit_card && (
                <span className="text-danger">
                  Credit card must be 13-16 digits long.
                </span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Credit Card Expiry (MMYY)</label>
              <input
                {...register("credit_expire", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.credit_expire && <span className="text-danger">Expiry date is required.</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">CVV</label>
              <input
                {...register("credit_cvv", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.credit_cvv && <span className="text-danger">CVV is required.</span>}
            </div>
            <button type="submit" className="rounded-0 btn btn-espresso ms-3">Purchase</button>
            <Link to="/" className="rounded-0 btn btn-espresso ms-5">Cancel</Link>
          </form>
          <p className="text-muted m-2">Ensure your credit card info is correct before submitting.</p>
        </div>
      </div>
    </Container>
  );
}
