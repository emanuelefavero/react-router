import { fetchData } from '@/lib/api';
import { validateProductsData } from './validation';

const PRODUCTS_URL = 'https://fakestoreapi.com/products/';

export const fetchProducts = () =>
  fetchData(PRODUCTS_URL).then((data) => {
    const products = validateProductsData(data);
    return products;
  });
