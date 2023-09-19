'use client';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { NavBar } from '..';
import { useApi } from '@/hooks';

const CartContext = React.createContext({
  cartItems: [],
  count: 0,
  setCartItems: () => null,
  totalAmount: 0,
});

const CartProvider = (props) => {
  const localCart = window.localStorage.getItem('cart') || '[]';
  const [cartItems, setCartItems] = useState(JSON.parse(localCart));
  const [products, setProducts] = useState([]);
  const { getProducts } = useApi();
  const [loading, setLoading] = useState(false);

  const loadProducts = (limit = 1) => {
    setLoading(true);
    getProducts(limit)
      .then((res) => {
        setProducts(res.data.products);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [count, totalAmount] = useMemo(() => {
    return cartItems.reduce(
      (acc, curr) => {
        const [lastCount, lastTotal] = acc;
        return [lastCount + curr.count, lastTotal + curr.count * curr.price];
      },
      [0, 0]
    );
  }, [cartItems]);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        count,
        setCartItems,
        totalAmount,
        products,
        loading,
        loadProducts,
        clearCart,
      }}
    >
      <NavBar loadProducts={loadProducts} setProducts={setProducts} />
      {props.children}
    </CartContext.Provider>
  );
};

const useCart = (product) => {
  const ctx = useContext(CartContext);

  const addToCart = () => {
    const prod = product;
    prod &&
      ctx.setCartItems((prev) => {
        const item = prev.find((i) => i.id === prod.id);
        if (item) {
          return prev.map((item) => ({
            ...item,
            count: item.id === prod.id ? item.count + 1 : item.count,
          }));
        } else {
          return [...prev, { ...prod, count: 1 }];
        }
      });
  };

  const removeFromCart = () => {
    const prod = product;
    prod &&
      ctx.setCartItems((prev) => {
        const item = prev.find((i) => i.id === prod.id);
        if (item.count > 1) {
          return prev.map((item) => ({
            ...item,
            count: item.id === prod.id ? item.count - 1 : item.count,
          }));
        } else {
          return prev.filter((item) => item.id !== prod.id);
        }
      });
  };

  return {
    ...ctx,
    addToCart,
    removeFromCart,
  };
};

export { CartProvider, CartContext, useCart };
