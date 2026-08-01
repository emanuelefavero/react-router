import { fetchData } from '@/lib/api';
import { validateProductData, validateProductsData } from './validation';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

let productsCache = null;
const productCache = new Map();

export const fetchProducts = () => {
  if (productsCache) return productsCache;

  productsCache = fetchData(PRODUCTS_URL)
    .then(validateProductsData)
    .catch((error) => {
      productsCache = null;
      throw error;
    });

  return productsCache;
};

export const fetchProduct = (productId) => {
  if (productCache.has(productId)) {
    return productCache.get(productId);
  }

  const request = fetchData(`${PRODUCTS_URL}/
    ${productId}`)
    .then((data) => {
      if (!data) return null;

      return validateProductData(data);
    })
    .catch((error) => {
      productCache.delete(productId);
      throw error;
    });

  productCache.set(productId, request);

  return request;
};
