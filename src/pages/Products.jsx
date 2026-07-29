import { Products as ProductsFeature } from '@/features/products';
import './Products.css';

export const Products = () => {
  return (
    <>
      <h1>Prodotti</h1>

      <ProductsFeature />
    </>
  );
};
