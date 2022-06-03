import { FC } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { ProductDocument } from '../models/Product';
import { incrementProduct, decrementProduct } from '../productSlice';

interface ProductComponentProps {
  product: ProductDocument;
}

const ProductComponent: FC<ProductComponentProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.product);
  let qty = 0;
  const cartItem = cart.find((item) => item._id === product._id);

  if (cartItem) {
    qty = cartItem.quantity;
  }

  return (
    <Card sx={{ width: 300, minWidth: 300 }}>
      <CardMedia
        component="img"
        height="140"
        image="http://via.placeholder.com/300.png/09f/fff"
        alt="image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ${product.price}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          ${product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={() => {
            dispatch(decrementProduct(product));
          }}
          disabled={qty === 0}
          size="large"
        >
          {' '}
          -{' '}
        </Button>
        <span>{qty}</span>
        <Button
          onClick={() => {
            dispatch(incrementProduct(product));
          }}
          size="large"
        >
          +
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductComponent;
