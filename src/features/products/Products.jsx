import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const PRODUCTS_URL = 'https://fakestoreapi.com/products/';

export const Products = () => {
  const [state, setState] = useState({ step: 'idle' });

  const loadProducts = useCallback(async () => {
    setState({ step: 'loading' });

    try {
      const { data } = await axios.get(PRODUCTS_URL);

      setState({ step: 'success', data });
    } catch (error) {
      setState({ step: 'error', error });
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const render = () => {
    switch (state.step) {
      case 'idle':
        return null;

      case 'loading':
        return <p role='status'>Caricamento...</p>;

      case 'error':
        return <p role='status'>Errore: {state.error}</p>;

      case 'success':
        return (
          <ul>
            {state.data.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <section aria-labelledby='products-title'>
      <h2>Prodotti</h2>

      {render()}
    </section>
  );
};
