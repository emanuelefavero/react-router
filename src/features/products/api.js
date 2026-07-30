import { fetchData } from '@/lib/api';
import { validateProductData, validateProductsData } from './validation';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = () =>
  fetchData(PRODUCTS_URL).then((data) => {
    const products = validateProductsData(data);
    return products;
  });

export const fetchProduct = (productId) =>
  fetchData(`${PRODUCTS_URL}/${productId}`).then((data) => {
    const product = validateProductData(data);
    return product;
  });
