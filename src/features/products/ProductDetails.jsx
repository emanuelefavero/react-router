import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Rating } from '@/components/ui/Rating';
import { Spinner } from '@/components/ui/Spinner';
import { paths } from '@/router/paths';
import { fetchProduct } from './api';
import { priceFormatter } from './utils';
import './ProductDetails.css';

const INITIAL_STATE = Object.freeze({ step: 'idle' });

const ProductError = ({ message, onRetry }) => (
  <section className='product-error' role='alert'>
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
    <nav className='product-navigation' aria-label='Product navigation'>
      {prevProduct && (
        <Button
          variant={Button.variant.ghost}
          onClick={() => navigate(paths.product(prevProduct.id))}
        >
          &larr; Previous product
        </Button>
      )}

      {nextProduct && (
        <Button
          variant={Button.variant.ghost}
          className='next'
          onClick={() => navigate(paths.product(nextProduct.id))}
        >
          Next product &rarr;
        </Button>
      )}
    </nav>
  );
};

const ProductSuccess = ({ product, prevProduct, nextProduct }) => (
  <div className='product-success'>
    <ProductNavigation prevProduct={prevProduct} nextProduct={nextProduct} />

    <Card
      as='section'
      className='product-details'
      aria-labelledby='product-details-title'
    >
      <Card.Header className='media'>
        <img
          className='image'
          src={product.image}
          alt={product.title}
          draggable='false'
          decoding='async'
        />
      </Card.Header>

      <Card.Content className='content'>
        <Badge className='category'>{product.category}</Badge>

        <h1 id='product-details-title' className='font-normal text-3xl'>
          {product.title}
        </h1>

        <Rating value={product.rating.rate} count={product.rating.count} />

        <p className='price font-semibold text-2xl'>
          {priceFormatter.format(product.price)}
        </p>

        <p className='description text-lg'>{product.description}</p>
      </Card.Content>
    </Card>
  </div>
);

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
        <ProductSuccess
          product={state.data}
          prevProduct={state.prevProduct}
          nextProduct={state.nextProduct}
        />
      );
    default:
      return null;
  }
};
