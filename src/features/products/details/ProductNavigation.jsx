import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';
import { paths } from '@/router/paths';

export const ProductNavigation = ({ prevProduct, nextProduct }) => {
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
