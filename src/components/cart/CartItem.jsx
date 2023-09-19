import { Button } from '@mui/material';

import React from 'react';
import { useCart } from '.';

const CartItem = (item) => {
  const { addToCart, removeFromCart } = useCart(item);
  return (
    <div
      key={item.id}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        paddingBottom: '20px',
        margin: '10px',
        width: 'auto',
      }}
    >
      <div style={{ flex: 1 }}>
        <h3>{item.title}</h3>
        <div
          className="information"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px 0px',
          }}
        >
          <p style={{ marginRight: '20px' }}>Price: ${item.price}</p>
          <p>Total: ${(item.count * item.price).toFixed(2)}</p>
        </div>
        <div
          className="buttons"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={removeFromCart}
          >
            -
          </Button>
          <p>{item.count}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={addToCart}
          >
            +
          </Button>
        </div>
      </div>
      <img
        src={item.images[0]}
        style={{
          maxWidth: '80px',
          objectFit: 'cover',
          marginLeft: '40px',
        }}
        alt={item.title}
      />
    </div>
  );
};

export default CartItem;
