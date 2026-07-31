import { fetchData } from '@/lib/api';
import { validateProductData, validateProductsData } from './validation';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = () =>
  fetchData(PRODUCTS_URL).then((data) => {
    return validateProductsData(data);
  });

export const fetchProduct = (productId) =>
  fetchData(`${PRODUCTS_URL}/${productId}`).then((data) => {
    if (!data) return null;

    return validateProductData(data);
  });
