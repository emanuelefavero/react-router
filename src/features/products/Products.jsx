import { useState, useEffect, useCallback } from 'react';
import { delay } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { ProductList } from './components/ProductList';
import { fetchProducts } from './api';
import './Products.css';

const INITIAL_STATE = Object.freeze({ step: 'idle' });

export const Products = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const loadProducts = useCallback(() => {
    setState({ step: 'loading' });

    return Promise.all([fetchProducts(), delay()])
      .then(([data]) => setState({ step: 'success', data }))
      .catch((error) =>
        setState({
          step: 'error',
          error,
        }),
      );
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleReload = () => loadProducts();

  const render = () => {
    switch (state.step) {
      case 'idle':
        return null;
      case 'loading':
        return <Spinner />;
      case 'error':
        return (
          <div role='alert'>
            <p>Error: {state.error.message}</p>
            <button onClick={handleReload}>Retry</button>
          </div>
        );
      case 'success':
        return <ProductList products={state.data} />;
      default:
        return null;
    }
  };

  return (
    <section className='products' aria-labelledby='products-title'>
      <h2 id='products-title' className='font-normal text-3xl'>
        Products
      </h2>

      {render()}
    </section>
  );
};
