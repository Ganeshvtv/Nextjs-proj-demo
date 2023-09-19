'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useCart } from './cart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function ProductCard(product) {
  const { addToCart } = useCart(product);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={`product/${product.id}`}>
        <CardHeader title={product.title} />
        <CardMedia
          component="img"
          height="194"
          image={product.images[0]}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton aria-label="add to favorites">
          <AttachMoneyIcon />
          <Typography variant="h5" color="black">
            {product.price}
          </Typography>
        </IconButton>
        <IconButton aria-label="share">
          <Button onClick={() => addToCart()} variant="contained">
            Add To Cart
          </Button>
        </IconButton>
      </CardActions>
    </Card>
  );
}
