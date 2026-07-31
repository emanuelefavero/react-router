import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { fetchProduct } from './api';
import './ProductDetails.css';

const INITIAL_STATE = Object.freeze({ step: 'idle' });

const ProductError = ({ message, onRetry }) => (
  <section className='product-details' role='alert'>
    <h1 className='font-normal text-3xl'>Unable to load product</h1>
    <p className='description'>{message}</p>

    <div className='actions'>
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
      <Link to='/products' className='link'>
        Back to products
      </Link>
    </div>
  </section>
);

export const ProductDetails = ({ productId }) => {
  const navigate = useNavigate();
  const [state, setState] = useState(INITIAL_STATE);
  const isValidProductId = Number.isInteger(productId) && productId > 0;

  const loadProduct = useCallback(() => {
    setState({ step: 'loading' });

    return fetchProduct(productId)
      .then((data) => {
        if (data === null) {
          navigate('/products', { replace: true });
          return;
        }

        setState({ step: 'success', data });
      })
      .catch((error) => setState({ step: 'error', error }));
  }, [productId, navigate]);

  useEffect(() => {
    if (!isValidProductId) {
      navigate('/products', { replace: true });
      return;
    }

    loadProduct();
  }, [isValidProductId, navigate, loadProduct]);

  switch (state.step) {
    case 'idle':
    case 'loading':
      return <Spinner />;
    case 'error':
      return (
        <ProductError
          message='Something went wrong. Please try again.'
          onRetry={loadProduct}
        />
      );
    case 'success':
      return (
        <section
          className='product-details'
          aria-labelledby='product-details-title'
        >
          <h1 id='product-details-title' className='font-normal text-3xl'>
            {state.data.title}
          </h1>

          <p className='description text-lg'>{state.data.description}</p>
        </section>
      );
    default:
      return null;
  }
};
