import { useEffect } from 'react';
import { IncrementalList } from '@/components/shared/IncrementalList';
import { Spinner } from '@/components/ui/Spinner';
import { useProducts } from '../context/useProducts';
import { ProductList } from './ProductList';
import './ProductCatalog.css';

export const ProductCatalog = () => {
  const { state, loadProducts } = useProducts();

  useEffect(() => {
    if (state.step === 'idle') loadProducts();
  }, [state.step, loadProducts]);

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
