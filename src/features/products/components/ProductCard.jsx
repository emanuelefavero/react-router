import './ProductCard.css';
// import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export const ProductCard = ({ product }) => {
  return (
    <Card as='article' className='product-card'>
      <Card.Header className='header'>
        <img
          className='image'
          src={product.image}
          alt={product.name}
          draggable='false'
          loading='lazy'
          decoding='async'
        />
        <Card.Title as='h3' className='title'>
          {product.title}
        </Card.Title>
      </Card.Header>
    </Card>
  );
};
