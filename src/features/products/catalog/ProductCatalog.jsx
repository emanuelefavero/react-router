import { useCallback, useEffect, useState } from 'react';
import { IncrementalList } from '@/components/shared/IncrementalList';
import { Spinner } from '@/components/ui/Spinner';
import { fetchProducts } from '../api';
import { ProductList } from './ProductList';
import './ProductCatalog.css';

const INITIAL_STATE = Object.freeze({ step: 'idle' });

export const ProductCatalog = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const loadProducts = useCallback(() => {
    setState({ step: 'loading' });

    return fetchProducts()
      .then((data) => setState({ step: 'success', data }))
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
        return (
          <IncrementalList
            batchSize={10}
            items={state.data}
            renderList={(visibleItems) => (
              <ProductList products={visibleItems} />
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      className='product-catalog'
      aria-labelledby='product-catalog-title'
    >
      <h1 id='product-catalog-title' className='font-normal text-3xl'>
        Our Products
      </h1>

      {render()}
    </section>
  );
};
