'use client';
import { useCart } from '@/components/cart';
import CartItem from '@/components/cart/CartItem';
import { Box, Button } from '@mui/material';
import React from 'react';

const CartPage = () => {
  const { cartItems, totalAmount, clearCart } = useCart();

  const onBuy = () => {
    const confirm = window.confirm('Buy All The Products');
    if (confirm) {
      clearCart();
    }
  };

  return (
    <Box sx={{ width: 'auto', paddingLeft: '30px' }} role="presentation">
      <h1 style={{ marginTop: '20px' }}>Your Cart</h1>
      {cartItems.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      {cartItems.length === 0 && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '30px',
          }}
        >
          <h3>Your Cart Is Empty</h3>
        </div>
      )}
      <Box
        sx={{ margin: '30px 0px', justifyContent: 'space-between' }}
        alignSelf={'center'}
      >
        <h2 style={{ marginBottom: '10px' }}>Total: ${totalAmount}</h2>
        <Button onClick={onBuy} variant="contained">
          Proceed To Buy
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
