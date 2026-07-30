const isValidProduct = (product) => {
  if (typeof product !== 'object' || product === null) return false;
  const requiredFields = [
    'id',
    'title',
    'price',
    'description',
    'category',
    'image',
    'rating',
  ];

  for (const field of requiredFields) {
    if (!(field in product)) return false;
  }

  if (
    typeof product.id !== 'number' ||
    typeof product.title !== 'string' ||
    typeof product.price !== 'number' ||
    typeof product.description !== 'string' ||
    typeof product.category !== 'string' ||
    typeof product.image !== 'string' ||
    typeof product.rating !== 'object' ||
    product.rating === null ||
    typeof product.rating.rate !== 'number' ||
    typeof product.rating.count !== 'number'
  ) {
    return false;
  }

  return true;
};

export const validateProductData = (data) => {
  if (!isValidProduct(data)) {
    throw new Error('Invalid data format: expected a product.');
  }

  return data;
};

export const validateProductsData = (data) => {
  if (!Array.isArray(data)) {
    throw new Error('Invalid data format: expected an array of products.');
  }

  const validProducts = data.filter(isValidProduct);

  if (validProducts.length !== data.length) {
    console.warn(
      'Some products were filtered out due to invalid structure or missing fields.',
    );
  }

  return validProducts;
};
