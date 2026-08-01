import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { paths } from '@/router/paths';
import { fetchProduct } from './api';
import './ProductDetails.css';

const INITIAL_STATE = Object.freeze({ step: 'idle' });

const ProductError = ({ message, onRetry }) => (
  <section className='product-details' role='alert'>
    <h1 className='font-normal text-3xl'>Unable to load product</h1>
    <p className='description'>{message}</p>

    <div className='actions'>
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
      <Link to={paths.products} className='link'>
        Back to products
      </Link>
    </div>
  </section>
);

const ProductNavigation = ({ prevProduct, nextProduct }) => {
  const navigate = useNavigate();

  if (!prevProduct && !nextProduct) return null;

  return (
    <nav className='actions' aria-label='Product navigation'>
      {prevProduct && (
        <Button onClick={() => navigate(paths.product(prevProduct.id))}>
          &larr; Previous product
        </Button>
      )}

      {nextProduct && (
        <Button onClick={() => navigate(paths.product(nextProduct.id))}>
          Next product &rarr;
        </Button>
      )}
    </nav>
  );
};

export const ProductDetails = ({ productId }) => {
  const navigate = useNavigate();
  const [state, setState] = useState(INITIAL_STATE);
  const isValidProductId = Number.isInteger(productId) && productId > 0;

  const loadProduct = useCallback(() => {
    setState({ step: 'loading' });

    const prevProductRequest =
      productId > 1 ? fetchProduct(productId - 1) : Promise.resolve(null);

    return Promise.all([
      fetchProduct(productId),
      prevProductRequest,
      fetchProduct(productId + 1),
    ])
      .then(([data, prevProduct, nextProduct]) => {
        if (data === null) {
          navigate(paths.products, { replace: true });
          return;
        }

        setState({ step: 'success', data, prevProduct, nextProduct });
      })
      .catch((error) => setState({ step: 'error', error }));
  }, [productId, navigate]);

  useEffect(() => {
    if (!isValidProductId) {
      navigate(paths.products, { replace: true });
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

          <ProductNavigation
            prevProduct={state.prevProduct}
            nextProduct={state.nextProduct}
          />
        </section>
      );
    default:
      return null;
  }
};
