'use client';
import { ProductCard } from '@/components';
import { useCart } from '@/components/cart';
import { useScrollEnd } from '@/hooks';
import { Grid } from '@mui/material';
import { useEffect } from 'react';

export default function Home() {
  const { products, loadProducts, loading } = useCart();
  const { scrollContainerRef, limit } = useScrollEnd(loading);

  useEffect(() => {
    loadProducts(limit);
  }, [limit]);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        marginTop: '10px',
        marginLeft: '10px',
        overflowY: 'auto',
        maxHeight: '90vh',
      }}
    >
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <ProductCard {...item} />
          </Grid>
        ))}
      </Grid>
      {loading && <p>Loading...</p>}
    </div>
  );
}
