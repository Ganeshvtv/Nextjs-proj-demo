'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardMedia,
} from '@mui/material';
import { useApi } from '@/hooks';
import { useCart } from '@/components/cart';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getProductDetails } = useApi();
  const { addToCart } = useCart(product);

  useEffect(() => {
    getProductDetails(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Typography variant="h6">Loading</Typography>;
  }

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardMedia
            component="img"
            alt={product.title}
            style={{ objectFit: 'contain' }}
            image={product.thumbnail}
            title={product.title}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h4" style={{ marginTop: '20px' }}>
            {product.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {product.brand}
          </Typography>
          <Typography variant="h5" color="primary">
            ${product.price}
          </Typography>
          <Typography style={{ marginTop: '20px' }} variant="body1">
            {product.description}
          </Typography>
          <Typography
            style={{ marginTop: '20px' }}
            variant="body2"
            color="textSecondary"
          >
            Category: {product.category}
          </Typography>
          <Typography
            style={{ marginTop: '20px' }}
            variant="body2"
            color="textSecondary"
          >
            Rating: {product.rating}
          </Typography>
          <Typography
            style={{ marginTop: '20px' }}
            variant="body2"
            color="textSecondary"
          >
            Stock: {product.stock}
          </Typography>
          <Typography
            style={{ marginTop: '20px' }}
            variant="body2"
            color="textSecondary"
          >
            Discount: {product.discountPercentage}%
          </Typography>
          <Button
            style={{ marginTop: '20px' }}
            onClick={() => addToCart()}
            variant="contained"
            color="primary"
          >
            Add to Cart
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
