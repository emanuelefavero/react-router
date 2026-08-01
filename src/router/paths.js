import { generatePath } from 'react-router';

export const paths = Object.freeze({
  home: '/',
  aboutUs: '/about-us',
  products: '/products',
  product: (productId) =>
    generatePath('/products/:productId', {
      productId: String(productId),
    }),
});
